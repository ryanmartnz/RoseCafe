const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Middleware

app.use(express.json()); // use req.body
app.use(cors({ credentials: true, origin: "https://rosecafe.tech"} ));
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

// const url = "https://api.rosecafe.tech";
const interval = 30000;

const reloadWebsite = async () => {
    const response = await fetch("https://api.rosecafe.tech/menu/drinks/hot-coffees", {
        method: "GET",
        credentials: "include"
    });
    if(response.ok) {
        console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
    } else {
        console.error(`Error reloading at ${new Date().toISOString()}:`, response.statusText)
    }
}

setInterval(reloadWebsite, interval)

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});