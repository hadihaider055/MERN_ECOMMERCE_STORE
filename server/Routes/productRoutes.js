const router = require("express").Router();
const {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getProductById,
} = require("../Controllers/productCtrl");
const auth = require("../Middlewares/auth");
const authAdmin = require("../Middlewares/authAdmin");

router.post("/createProduct", auth, authAdmin, createProduct);
router.delete("/deleteProduct/:id", auth, authAdmin, deleteProduct);
router.get("/getProducts", getAllProducts);
router.get("/getProductById/:id", getProductById);
router.put("/updateProduct/:id", auth, authAdmin, updateProduct);

module.exports = router;
