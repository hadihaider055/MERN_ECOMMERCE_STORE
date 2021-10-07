const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userEmail: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userPhone: {
      type: String,
      required: true,
    },
    userAddress: {
      type: String,
      required: true,
    },
    userCity: {
      type: String,
      required: true,
    },
    userState: {
      type: String,
      required: true,
    },
    userZip: {
      type: String,
      required: true,
    },
    cart: {
      type: Array,
      default: [],
    },
    orderStatus: {
      type: String,
      required: true,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const checkoutModel = mongoose.model("Checkout", checkoutSchema);

module.exports = checkoutModel;
