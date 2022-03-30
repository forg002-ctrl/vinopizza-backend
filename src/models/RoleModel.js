import mongoose from "mongoose";

const Role = mongoose.Schema({
    value: { type: String, unique: true, default: "Moderator"}
});

export default mongoose.model("Role", Role); 