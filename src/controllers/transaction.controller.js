const { Transaction } = require("../models/transaction.model");
const { ApiResponse } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");
const { asyncHandler } = require("../utils/asyncHandler");

const createTransaction = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const { createdAt, toFrom, description, category, amount, type } = req.body;
  if (!createdAt || !toFrom || !description || !category || !amount || !type) {
    return new ApiError(400, "All fields are required");
  }
  const transaction = await Transaction.create({
    createdAt,
    toFrom,
    description,
    category,
    amount,
    type,
  });

  const createdTransaction = await Transaction.findById(transaction._id);
  if (!createdTransaction) {
    throw new ApiError(500, "Error occured while creating the user");
  }
  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        createdTransaction,
        "Transaction created successfully"
      )
    );
});

const deleteTransaction = asyncHandler(async (req, res) => {
  const { transactionId } = req.params;
  const transaction = await Transaction.findById(transactionId);
  if (!transaction) {
    throw new ApiError(404, "Transaction not found");
  }
  await Transaction.deleteOne({ _id: transactionId });
  return res.status(204).send();
});

const updateTransaction = asyncHandler(async (req, res) => {
  const { transactionId } = req.params;
  const transaction = await Transaction.findById(transactionId);
  if (!transaction) {
    throw new ApiError(404, "Transaction not found");
  }
  const updatedFields = req.body;
  const updatedTransaction = await findByIdAndUpdate(
    transactionId,
    updatedFields,
    { new: true }
  );
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedTransaction,
        "Transaction updated successfully"
      )
    );
});

const getTransactions = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  // write logic such that 15 transaction will be fetched at a time and the latest ones only
});

module.exports = {
  createTransaction,
  deleteTransaction,
  updateTransaction,
  getTransactions,
};
