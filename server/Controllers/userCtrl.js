const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Form Validation
    if (!name) return res.status(400).json({ message: "Name is required" });

    if (!email)
      return res
        .status(400)
        .json({ message: "Please enter a valid email address" });

    if (!password || password.length < 8)
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });

    // User Find
    const userExist = await User.findOne({ email: email });

    // If user not exist then ....
    if (!userExist) {
      const hashPassword = bcrypt.hashSync(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashPassword,
      });
      newUser.save();
      return res.status(201).json({ message: "User created successfully!" });
    }
    // If user exist then ....
    return res.status(400).json({
      message: "User already exists",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const userSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Form Validation
    if (!email)
      return res
        .status(400)
        .json({ message: "Please enter a valid email address" });

    if (!password || password.length < 8)
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });

    // User Find
    const userExist = await User.findOne({ email: email });

    // If user not exist then ....
    if (!userExist)
      return res.status(400).json({ message: "User does not exist" });

    // If user exist then ....
    const isMatch = bcrypt.compareSync(password, userExist.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials!" });

    // If user exist and password is correct then ....
    const payload = { id: userExist._id, name: userExist.name };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({
      message: "User logged in successfully",
      token: token,
      name: userExist.name,
      role: userExist.role,
      id: userExist._id,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(400).json({ msg: "User does not exist." });
    await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        cart: req.body.cart,
      }
    );

    return res.status(201).json({ msg: "Added to cart", cart: user.cart });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
module.exports = { userSignup, userSignin, addCart };
