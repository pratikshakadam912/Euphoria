import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    name: String,
    email: String,
    role: {
        type: String,
        default: "user"
    }
}, { timestamps: true });

export default mongoose.model("User", userSchema);