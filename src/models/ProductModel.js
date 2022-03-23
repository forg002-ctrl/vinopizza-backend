import mongoose from "mongoose";

const Product = new mongoose.Schema({
  image: { type: String, required: true },
  discount: { type: Number, required: true, default: 0},
  price: { type: String, required: true },
  translation: {
    ru: {
      name: { type: String, required: true },
      description: { type: String, required: true },
      category: { type: String, required: true },
      metrics: { type: String, required: true }
    },
    ro: {
      name: { type: String, required: true },
      description: { type: String, required: true },
      category: { type: String, required: true },
      metrics: { type: String, required: true },
    },
  }
});

export default mongoose.model("Product", Product);