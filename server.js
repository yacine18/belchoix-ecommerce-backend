import express from "express";
import path from "path";
import dotenv from "dotenv";
import "./database.js";
import cors from "cors";
import database from "./database.js";
import userRouter from "./routers/users.router.js";
import productRouter from "./routers/products.router.js";
import orderRouter from "./routers/orders.router.js";

const app = express();

//Connecting DB
database();

//middleware
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));


// ROUTES //

// users router
app.use("/api/users", userRouter);

//products router
app.use("/api/products", productRouter);

//orders routers
app.use("/api/orders", orderRouter);

//paypal clientID
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server is running"));
