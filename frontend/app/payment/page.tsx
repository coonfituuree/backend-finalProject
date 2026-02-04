"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { paymentApi } from "@/shared/api/payment.api";
import { bookingApi } from "@/shared/api/booking.api";
import { Booking } from "@/shared/types/booking.types";
import { cardValidation } from "@/shared/utils/cardValidation";
import { SuccessModal } from "@/shared/ui/SuccessModal";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get("bookingId");

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Добавляем состояние для модального окна
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [cardForm, setCardForm] = useState({
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  });

  useEffect(() => {
    if (!bookingId) {
      setError("Бронирование не найдено");
      setTimeout(() => router.push("/bookings"), 2000);
      return;
    }

    loadBooking();
  }, [bookingId]);

  const loadBooking = async () => {
    if (!bookingId) return;

    setLoading(true);
    try {
      const result = await bookingApi.getBookingById(bookingId);
      if (result.booking) {
        setBooking(result.booking);
      } else {
        setError("Бронирование не найдено");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ошибка загрузки бронирования",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
      setCardForm({ ...cardForm, [name]: formatted });
    } else {
      setCardForm({ ...cardForm, [name]: value });
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const cleanCardNumber = cardForm.cardNumber.replace(/\s/g, "");

    if (!cardValidation.isValidCardNumber(cleanCardNumber)) {
      setError("Неверный номер карты");
      return;
    }

    if (!cardValidation.isValidCVV(cardForm.cvv)) {
      setError("Неверный CVV код");
      return;
    }

    const expMonth = parseInt(cardForm.expMonth);
    const expYear = parseInt(cardForm.expYear);

    if (!cardValidation.isValidExpiry(expMonth, expYear)) {
      setError("Неверный срок действия карты");
      return;
    }

    setProcessing(true);

    try {
      await paymentApi.payBooking({
        bookingId: bookingId || "",
        cardNumber: cleanCardNumber,
        expMonth,
        expYear,
        cvv: cardForm.cvv,
      });

      // ✅ Обновляем данные бронирования после оплаты
      const updatedBooking = await bookingApi.getBookingById(bookingId!);
      if (updatedBooking.booking) {
        setBooking(updatedBooking.booking);
      }

      // ✅ Показываем модальное окно вместо редиректа
      setShowSuccessModal(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка обработки платежа");
    } finally {
      setProcessing(false);
    }
  };

  // ✅ Обработчик закрытия модального окна
  const handleCloseModal = () => {
    setShowSuccessModal(false);
    router.push("/bookings");
  };

  // ✅ Обработчик перехода к бронированиям
  const handleViewBookings = () => {
    setShowSuccessModal(false);
    router.push("/bookings");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center max-w-md">
          <p className="text-red-600 mb-4">Ошибка: Бронирование не найдено</p>
          <button
            onClick={() => router.push("/bookings")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Вернуться к бронированиям
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ✅ Модальное окно успешной покупки */}
      {booking && (
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={handleCloseModal}
          booking={booking}
          onViewBookings={handleViewBookings}
        />
      )}

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Booking Summary */}
          <div className="bg-white rounded-lg shadow-xl p-6 h-fit">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Сводка бронирования
            </h2>

            {/* Flight Info */}
            <div className="mb-6 pb-6 border-b">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Вылет</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {booking.flight?.departureTime}
                  </p>
                  <p className="text-sm text-gray-600">
                    {booking.flight?.from}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-600 font-semibold">
                    Прибытие
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    {booking.flight?.arrivalTime}
                  </p>
                  <p className="text-sm text-gray-600">{booking.flight?.to}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-sm text-gray-600">
                  <strong>Рейс:</strong> {booking.flight?.flightNumber}
                </p>
                <div className="flex flex-col gap-2 text-sm text-gray-600">
                  <div>
                    <strong>Дата вылета:</strong>{" "}
                    {booking.flight?.departureDate}
                  </div>
                  <div>
                    <strong>Дата прибытия:</strong>{" "}
                    {booking.flight?.arrivalDate}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6 pb-6 border-b">
              <p className="text-sm text-gray-600 font-semibold mb-4">
                Бронирование
              </p>
              <p className="text-sm text-gray-600">
                <strong>PNR:</strong> {booking.pnr}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Класс:</strong>{" "}
                {booking.cabinClass === "economy" ? "Эконом" : "Бизнес"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Пассажиры:</strong> {booking.passengers.length}
              </p>
            </div>

            {/* Passengers */}
            <div className="mb-6 pb-6 border-b">
              <p className="text-sm text-gray-600 font-semibold mb-3">
                Пассажиры
              </p>
              <ul className="space-y-2">
                {booking.passengers.map((p, idx) => (
                  <li key={idx} className="text-sm text-gray-700">
                    {idx + 1}. {p.firstName} {p.lastName}
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Цена за пассажира:</span>
                <span>{booking.pricePerPassenger.toLocaleString()} ₸</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Количество пассажиров:</span>
                <span>{booking.passengers.length}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-blue-600 pt-4 border-t">
                <span>Итого к оплате:</span>
                <span>{booking.totalPrice.toLocaleString()} ₸</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Способ оплаты
            </h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                {success}
              </div>
            )}

            <form onSubmit={handlePayment} className="space-y-6">
              {/* Card Number */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Номер карты
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={cardForm.cardNumber}
                  onChange={handleCardChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Введите 16-значный номер карты
                </p>
              </div>

              {/* Card Holder Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Имя держателя карты
                </label>
                <input
                  type="text"
                  placeholder="Иван Иванов"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Месяц
                  </label>
                  <input
                    type="number"
                    name="expMonth"
                    value={cardForm.expMonth}
                    onChange={handleCardChange}
                    placeholder="01"
                    min="01"
                    max="12"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Год
                  </label>
                  <input
                    type="number"
                    name="expYear"
                    value={cardForm.expYear}
                    onChange={handleCardChange}
                    placeholder="25"
                    min={new Date().getFullYear().toString().slice(-2)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={cardForm.cvv}
                    onChange={handleCardChange}
                    placeholder="123"
                    maxLength={4}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>🔒 Безопасность:</strong> Ваши данные карты защищены и
                  будут использованы только для обработки этого платежа.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={processing}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50">
                {processing
                  ? "Обработка платежа..."
                  : `Оплатить ${booking.totalPrice.toLocaleString()} ₸`}
              </button>

              {/* Cancel Button */}
              <button
                type="button"
                onClick={() => router.push("/bookings")}
                className="w-full bg-gray-300 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-400 transition">
                Отмена
              </button>
            </form>

            {/* Test Card Info */}
            <div className="mt-6 pt-6 border-t">
              <p className="text-xs text-gray-600 mb-2">
                <strong>Для тестирования используйте:</strong>
              </p>
              <p className="text-xs text-gray-600">
                Карта: 4111 1111 1111 1111
              </p>
              <p className="text-xs text-gray-600">CVV: 123 (любой)</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
