import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please provide your name!"],
        minLength: [3, "Name must contains atleast 3 characters!"],
        maxLength: [50, "Name cannot exceed 50 characters!"],
    },
    email:{
        type:String,
        validator: [validator.isEmail, "Please provide valid email!"],
        required: [true, "Please provide your email!"],
    },
    coverLetter:{
        type: String,
        required: [true, "Please provide your Cover Letter!"]
    },
    phone:{
        type: Number,
        required: [true, "Please provide Phone Number!"]
    },
    address:{
        type:String,
        required: [true, "Please provide your Address!"]
    },
    resume:{
        public_id:{
            type:String,
            required: true
        },
        url:{
            type:String,
            required:true

        }  
    },
    applicantID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            requird:true
        },
        role:{
            type:String,
            enum:["Job Seeker"],
            required:true
        }
    },
    employerID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            requird:true
        },
        role:{
            type:String,
            enum:["Employer"],
            required:true
        }
    }
})

export const Application = mongoose.model("Application", applicationSchema);