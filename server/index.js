const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Middleware

app.use(express.json()); // use req.body
app.use(cors({ credentials: true, origin: "rosecafe.tech"} ));
app.use(cookieParser());

// Routes

//register and login routes
app.use("/auth", require("./routes/jwtAuth"));

//dashboard route
app.use("/dashboard", require("./routes/dashboard"));

//products route
app.use("/product", require("./routes/products"));

//menu route
app.use("/menu/drinks", require("./routes/drinksMenu"));
app.use("/menu/food", require("./routes/foodMenu"));

//cart route
app.use("/cart", require("./routes/cart"));

//orders route
app.use("/orders", require("./routes/orders"));

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});