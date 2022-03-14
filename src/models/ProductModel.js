import mongoose from "mongoose";

const Products = new mongoose.Schema({
  image: { type: String, required: true },
  price: { type: String, required: true },
  translation: {
    ru: {
      name: { type: String, required: true },
      description: { type: String, required: true },
      category: { type: String, required: true },
      metrics: { type: String, required: true },
    },

    ro: {
      name: { type: String, required: true },
      description: { type: String, required: true },
      category: { type: String, required: true },
      metrics: { type: String, required: true },
    },
  },
});

export default mongoose.model("Product", Products);
