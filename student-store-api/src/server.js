const express = require("express");
require("dotenv").config();
const PORT = 3000;
const cors = require("cors");
const morgan = require("morgan");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.listen(PORT, () => {
	console.log(`Server running at port ${PORT}`);
});
