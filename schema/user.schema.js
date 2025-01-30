// user schema for mongoose

import mongoose, {Schema} from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: 1,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    }
});

// use bcrypt to hash password before saving

userSchema.pre("save", async function(next) {
    // if (!this.isModified("password")) {
    //     return next();
    // }
    try {
        // hash password
        const encrypted = await bcrypt.hash(this.password.toString(), 12);
        this.password = encrypted;
        console.log(this.password)
        next();
    } catch (err) {
        next(err);
    }
});

// Fix: Prevent duplicate model registration
const User = mongoose.models.User || mongoose.model("User", userSchema);

// 

export default User;