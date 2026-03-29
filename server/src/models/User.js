import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email"]
    },
    hashedPassword: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "buyer"
    },
    favourites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property"
        }
    ]
}, { timestamps: true });

export default mongoose.model("User", userSchema);