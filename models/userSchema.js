import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import { type } from 'express/lib/response';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength: [3, "Name must contain at least 3 characters!"],
        maxLength: [30, "Name cannot exceed 30 charcters!"],
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        validate: [validator.isEmail, "please provide a valid Email!"],
    },
    phone:{
        type: Number,
        required: [true, "Phone number is required"]
    },
    password:{
        type:String,
        required: [true, "password is required"],
        minLength: [8, "Password must contain atleast 8 characters!"],
        maxLength: [32, "password cannot exceed 32 characters!"],
    },
    role:{
        type: String,
        required: [true, "Please provide your role"],
        enum: ["Job Seeker", "Employer"],
    },
    createdAt:{
        type : Date,
        default: Date.now,
    },
});

//HASHING THE PASSWORD 
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//COMPARING PASSWORD
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

// GENERATING A JWT TOKEN FOR AUTHORIZATION
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {expireIn: process.env.JWT_EXPIRE})
}