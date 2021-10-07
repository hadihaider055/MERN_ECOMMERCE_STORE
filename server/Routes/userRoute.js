const { userSignup, userSignin, addCart } = require("../Controllers/userCtrl");
const auth = require("../Middlewares/auth");

const router = require("express").Router();

// User Signup
router.post("/signup", userSignup);

// User Signin
router.post("/signin", userSignin);

router.patch("/addCart", auth, addCart);

module.exports = router;
