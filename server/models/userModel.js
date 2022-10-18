import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            lowercase: true,
            required: [true, 'Email must be required'],
            unique: [true, 'Email already exists'],
            trim: true,
            validate: (value) => {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid email address.');
                }
            },
        },
        number: {
            type: Number,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password must be required'],
            minlength: [8, 'Password must be of minimum 8 characters'],
        },
        refreshToken: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

userSchema.index({ username: 1, email: 1 });

const userModel = mongoose.model('User', userSchema);

export default userModel;
