import flightsModel from "../models/flight.model.js";
import userModel from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");

    if (users.length == 0) {
      return res
        .status(404)
        .json({ success: false, message: "Users not found" });
    }

    return res
      .status(200)
      .json({ success: true, data: users, count: users.length });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const postFlight = async (req, res) => {
  try {
    const required = [
      "from",
      "to",
      "departureTime",
      "arrivalTime",
      "flightNumber",
    ];
    for (const f of required) {
      if (!req.body?.[f]) {
        return res
          .status(400)
          .json({ success: false, message: `Missing field: ${f}` });
      }
    }

    const flight = await flightsModel.create({
      from: req.body.from,
      fromAirport: req.body.fromAirport,
      fromAirportAbbreviation: req.body.fromAirportAbbreviation,
      to: req.body.to,
      toAirport: req.body.toAirport,
      toAirportAbbreviation: req.body.toAirportAbbreviation,
      operatedBy: req.body.operatedBy,
      flightNumber: req.body.flightNumber,
      airplaneType: req.body.airplaneType,
      departureTime: req.body.departureTime,
      departureDate: req.body.departureDate,
      arrivalTime: req.body.arrivalTime,
      arrivalDate: req.body.arrivalDate,
      flightDuration: req.body.flightDuration,
      numberOfTransfers: req.body.numberOfTransfers,
      economyPrice: req.body.economyPrice,
      businessPrice: req.body.businessPrice,
    });

    return res.status(201).json({
      success: true,
      message: "Flight Route Created",
      data: flight,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const postFlightsBulk = async (req, res) => {
  try {
    const flights = req.body; // Changed: expect array directly

    if (!Array.isArray(flights)) {
      return res.status(400).json({
        success: false,
        message: "Request body must be an array of flights",
      });
    }

    if (flights.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Flights array is empty",
      });
    }

    const required = [
      "from",
      "to",
      "departureTime",
      "arrivalTime",
      "flightNumber",
    ];

    for (let i = 0; i < flights.length; i++) {
      for (const f of required) {
        if (!flights[i]?.[f]) {
          return res.status(400).json({
            success: false,
            message: `Missing field "${f}" in item #${i + 1}`,
          });
        }
      }
    }

    const result = await flightsModel.insertMany(flights, {
      ordered: false,
    });

    return res.status(201).json({
      success: true,
      message: "Flights created successfully",
      insertedCount: result.length,
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getAllFlights = async (req, res) => {
  try {
    const flights = await flightsModel.find();
    if (flights.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No flights found" });
    }

    return res.status(200).json({
      success: true,
      data: flights,
      count: flights.length,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
