import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "booking",
      required: true,
      unique: true, 
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },

    amount: { type: Number, required: true },
    currency: { type: String, default: "KZT" },

    cardLast4: { type: String, required: true },
    expMonth: { type: Number, required: true },
    expYear: { type: Number, required: true },

    status: { type: Boolean, default: false }, 
  },
  { timestamps: true },
);

export default mongoose.models.payment ||
  mongoose.model("payment", paymentSchema);
