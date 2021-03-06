import mongoose from "mongoose";

const Meal = new mongoose.Schema({
  image: { type: String, required: true },
  discount: { type: Number, required: true, default: 0 },
  price: { type: Number, required: true },
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
    }
  },
  recommendedDrinks: [
    {
      drink: { type: mongoose.Schema.Types.ObjectId, ref: 'DrinksStuff' }
    }
  ]
});

export default mongoose.model("Meal", Meal);