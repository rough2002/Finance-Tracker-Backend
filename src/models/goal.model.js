const mongoose = require("mongoose");

const goalSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  remainingAmount: { type: Number },
  timeline: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  notification: { type: Boolean, default: false },
  color: { type: String },
});

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;
