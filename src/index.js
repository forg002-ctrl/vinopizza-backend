import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import dotenv from "dotenv/config";
import productRouter from "./routers/product.js";
import categoryRouter from "./routers/category.js"
import orderRouter from "./routers/orders.js"


const app = express();
const PORT = process.env.Port;
const DB_URL = process.env.Database_URL;

app.use(bodyParser.json());
app.use(express.static('static'));
app.use(fileUpload({}));
app.use("/api/v1/products", productRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/orders", orderRouter);


async function startApp() {
  try {
    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(PORT, () =>
      console.log(`server running on port http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
}

startApp();