import mongoose from "mongoose";

const Order = new mongoose.Schema({
    time:{type:Date, required:true},
    customer_info: {
        name: {type:String, required:true},
        city: {type:String, required:true},
        address: {
            street:{type:Number, required:true},
            houseNumber:{type:Number, required:true},
            flat:{type:String, required:true},
            entrance:{type:Number, required:false},
            floor:{type:Number, required:false},
            codeIntercom:{type:String, required:false}
        },
        phone:{type:String, required:true}
    },
    additionalInfo:{type:String, required:true},
    items: [
        {
            name:{type:String, required:true},
            price:{type:Number, required:true},
            amount:{type:Number, required:true} 
        }
    ],
    paymentMethod:{type:String, required:true},
    total:{type:Number, required:true}
})

export default mongoose.model("Order", Order)