const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connDB = require("./Config/index");
const userRoute = require("./Routes/userRoute");
const productRoute = require("./Routes/productRoutes");
const checkoutRoute = require("./Routes/checkoutRoute");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Database
connDB();

// Routes
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", checkoutRoute);

// Deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../", "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "client", "build", "index.html"));
  });
}

// app running
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server running on port", port);
});
