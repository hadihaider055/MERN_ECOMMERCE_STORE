const checkoutModel = require("../Models/checkoutModel");

const checkoutUser = async (req, res) => {
  try {
    const {
      userEmail,
      userName,
      userPhone,
      userAddress,
      userCity,
      userState,
      userZip,
      cart,
    } = req.body;
    if (
      !userEmail ||
      !userPhone ||
      !userAddress ||
      !userCity ||
      !userState ||
      !userZip ||
      !cart
    ) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }
    const checkout = await new checkoutModel({
      userEmail,
      userName,
      userPhone,
      userAddress,
      userCity,
      userState,
      userZip,
      cart,
      userId: req.user.id,
    });
    await checkout.save();
    return res.status(200).json({
      message: "Checkout Successful",
      data: checkout,
    });
  } catch (error) {
    console.log(error);
  }
};

const checkoutHistory = async (req, res) => {
  try {
    const checkout = await checkoutModel.find({ userId: req.user.id });
    return res.status(200).json({
      message: "Checkout History",
      data: checkout,
    });
  } catch (error) {
    console.log(error);
  }
};

const checkoutAdminHistory = async (req, res) => {
  try {
    const checkout = await checkoutModel.find({});
    return res.status(200).json({
      message: "Checkout History",
      data: checkout,
    });
  } catch (error) {
    console.log(error);
  }
};

// const checkoutOrderDelete = async (req, res) => {
//   try {
//     const { id } = req.body;
//     if (!id) {
//       return res.status(400).json({
//         message: "Please fill all the fields",
//       });
//     }
//     await checkoutModel.findOneAndDelete({ _id: id });
//     return res.status(200).json({
//       message: "Checkout Order Deleted",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

module.exports = {
  checkoutUser,
  checkoutHistory,
  checkoutAdminHistory,
  // checkoutOrderDelete,
};
