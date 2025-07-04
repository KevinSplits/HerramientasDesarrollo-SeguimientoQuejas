import mongoose from "mongoose";

const cinemaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Cinema", cinemaSchema);
