const {
  checkoutUser,
  checkoutHistory,
  checkoutAdminHistory,
  // checkoutOrderDelete,
} = require("../Controllers/checkoutCtrl");

const router = require("express").Router();
const auth = require("../Middlewares/auth");
const authAdmin = require("../Middlewares/authAdmin");

router.post("/checkoutUser", auth, checkoutUser);
router.get("/checkoutHistory", auth, checkoutHistory);
router.get("/admin/checkoutHistory", auth, authAdmin, checkoutAdminHistory);
// router.delete("/admin/order-delete", auth, authAdmin, checkoutOrderDelete);

module.exports = router;
