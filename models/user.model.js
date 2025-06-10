import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name is required.'],
        trim: true,
        minlength: 3,
        maxlength: 20,
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address.'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        minlength: 8,
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;
