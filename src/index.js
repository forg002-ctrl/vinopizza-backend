import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import dotenv from "dotenv/config";
import productRouter from "./routers/product.js";
import homeRouter from "./routers/home.js";

const app = express();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL_URL;

app.use(bodyParser.json());
app.use(fileUpload({}));
app.use("/products", productRouter);
app.use("/", homeRouter);

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
