import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Please provide job title"],
        minLength: [3, "Job title must contain at least 3 characters!"],
        maxLength: [50, "Job title can't exceed 50  characters!"],
    },
    description: {
        type: String,
        required:[true, "Please provide job description"],
        minLength:[50, "Job Description must contain atleast 50 characters!"],
        maxLength: [300, "Job title can't exceed 300  characters!"],
    },
    category:{
        type:String,
        required:[true, "Job category is required!"],
    },
    country:{
        type:String,
        required:[true, "Job country is required!"],
    },
    city:{
        type:String,
        required:[true, "Job city is required!"],
    },
    location:{
        type:String,
        required:[true, "Please provide exact location!"],
        minLength:[5, "Job location must contain atleast 5 characters!"],
    },
    fixedSalary:{
        type:Number,
        minLength:[4, "Fixed Salary must contain at least 4 digits"],
        maxLength:[9, "Fixed Salary cannot exceed 9 digits"],
    },
    salaryFrom:{
        type:Number,
        minLength:[4, "Salary From must contain at least 4 digits"],
        maxLength:[9, "Salary From cannot exceed 9 digits"],
    },
    salaryTo:{
        type:Number,
        minLength:[4, "salary To must contain at least 4 digits"],
        maxLength:[9, "salary To cannot exceed 9 digits"],
    },
    expired:{
        type: Boolean,
        default: false,
    },
    joobPostedOn:{
        type:Date,
        default: Date.now,
    },
    postedBy:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
});

export const Job = mongoose.model("Job", jobSchema);