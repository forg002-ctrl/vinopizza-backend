import mongoose from "mongoose"

const Category = new mongoose.Schema({
    translation:{
        ru:{
            name:{type:String, required:true}
        },
        ro:{
            name:{type:String, required:true} 
        }
    }
})

export default mongoose.model("Category", Category)
 