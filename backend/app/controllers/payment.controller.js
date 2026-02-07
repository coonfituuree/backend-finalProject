import bookingModel from "../models/booking.model.js";
import paymentModel from "../models/payment.model.js";
import flightsModel from "../models/flight.model.js";
import { sendEmail } from "../config/nodemailer.js";
import { isValidLuhn, isCardNotExpired } from "../utils/cardValidation.js";

const buildTicketText = ({ booking, flight }) => {
  return (
    `✅ E-Ticket / Booking Confirmed\n\n` +
    `PNR: ${booking.pnr}\n\n` +
    `Flight details:\n` +
    `Route: ${flight.fromAirport} → ${flight.toAirport}\n` +
    `Flight: ${flight.operatedBy} ${flight.flightNumber}\n` +
    `Departure: ${flight.departureTime}\n` +
    `Arrival: ${flight.arrivalTime}\n\n` +
    `Cabin: ${booking.cabinClass}\n` +
    `Passengers: ${booking.passengers.map((p) => `${p.firstName} ${p.lastName}`).join(", ")}\n\n` +
    `Total paid: ${booking.totalPrice} KZT\n\n` +
    `Thank you for choosing Vizier Airways!`
  );
};

export const payBooking = async (req, res) => {
  const userId = req.user.id;
  const { bookingId, cardNumber, expMonth, expYear } = req.body;

  try {
    // 1. Валидация карты
    if (!isValidLuhn(cardNumber)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid card number" });
    }
    if (!isCardNotExpired(expMonth, expYear)) {
      return res.status(400).json({ success: false, message: "Card expired" });
    }

    // 2. Поиск бронирования (с подгрузкой данных юзера для email)
    const booking = await bookingModel
      .findOne({
        _id: bookingId,
        user: userId,
      })
      .populate("user");

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    if (booking.status === "confirmed") {
      return res
        .status(400)
        .json({ success: false, message: "Booking already confirmed" });
    }

    // 3. Создание платежа
    const payment = await paymentModel.create({
      booking: booking._id,
      user: userId,
      amount: booking.totalPrice,
      currency: "KZT",
      cardLast4: cardNumber.slice(-4),
      expMonth,
      expYear,
      status: true,
    });

    booking.status = "confirmed";
    booking.payment = payment._id;
    await booking.save();

    const flight = await flightsModel.findById(booking.flight);
    const recipientEmail = booking.email || booking.user?.email;

    if (flight && recipientEmail) {
      const text = buildTicketText({ booking, flight });
      try {
        await sendEmail(
          recipientEmail,
          `Your E-Ticket (PNR: ${booking.pnr})`,
          text,
        );
        console.log(`[Email] Ticket sent to ${recipientEmail}`);
      } catch (e) {
        console.error("[Email Error] Failed to send ticket:", e?.message || e);
      }
    }

    return res.json({
      success: true,
      message: "Payment successful. Ticket is being sent to your email.",
      bookingId: booking._id,
      paymentId: payment._id,
      pnr: booking.pnr,
    });
  } catch (err) {
    console.error("CRITICAL_PAYMENT_ERROR:", err);
    if (err?.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Payment already exists for this booking",
      });
    }
    return res.status(500).json({ success: false, message: err.message });
  }
};
