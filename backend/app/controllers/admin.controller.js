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
      to: req.body.to,
      toAirport: req.body.toAirport,
      operatedBy: req.body.operatedBy,
      flightNumber: req.body.flightNumber,
      airplaneType: req.body.airplaneType,
      departureTime: req.body.departureTime,
      arrivalTime: req.body.arrivalTime,
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
    if (!Array.isArray(req.body)) {
      return res.status(400).json({
        success: false,
        message: "Request body must be an array of flights",
      });
    }

    if (req.body.length === 0) {
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

    for (let i = 0; i < req.body.length; i++) {
      for (const f of required) {
        if (!req.body[i]?.[f]) {
          return res.status(400).json({
            success: false,
            message: `Missing field "${f}" in item #${i + 1}`,
          });
        }
      }
    }

    const flights = await flightsModel.insertMany(req.body, {
      ordered: false,
    });

    return res.status(201).json({
      success: true,
      message: "Flights created successfully",
      insertedCount: flights.length,
      data: flights,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
