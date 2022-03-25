import mongoose from "mongoose";

const Order = new mongoose.Schema({
  time: { type: String, required: true },
  customer_info: {
    name: { type: String, required: true },
    city: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      houseNumber: { type: Number, required: true},
      flat: { type: Number, required: false},
      entrance: { type: Number, required: false},
      floor: { type: Number, required: false},
      codeIntercom: { type: String, required: false}
    },
    phone: { type: String, required: true},
  },
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      amount: { type: Number, required: true}
    },
  ],
  paymentMethod: { type: String, enum:['Cash', 'Online', 'Card'], required: true, default:'Cash'},
  total: { type: Number, required: true },
  status: { type: String, enum:['Pending', 'In Procces', 'Done'], required: true, default: 'Pending'}
}); 

export default mongoose.model("Order", Order);