const mongoose = require("mongoose");

const transactionSchema = new Schema({
  createdAt: { type: Date, required: true, default: Date.now },
  toFrom: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: String, required: true },
  type: { type: String, required: true },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
