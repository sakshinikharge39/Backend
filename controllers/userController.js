import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncError(async (req, res, next) => {
  try{

  
  const { name, email, phone, role, password } = req.body;
  console.log(req.body);
  if (!name || !email || !phone || !role || !password) {
    return next(new ErrorHandler("please fill registration form"));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already exist"));
  }
  const user = await User.create({
    name,
    email,
    phone,
    role,
    password,
  });
  // res.status(200).json({
  //     success: true,
  //     message: "User Rgistered!",
  //user,
  // })
  sendToken(user, 200, res, "User Registered Succefully!");
  res.json(200)({message:"data saved succesuflly"})
}catch(e){
  
  res.json({message:"error"})
  
}
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("please fill login form.", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or password", 400));
  }
  if (user.role !== role) {
    return next(new ErrorHandler("User with his role not found", 400));
  }
  sendToken(user, 200, res, "User Logged in succesfully!");
});


export const logout = catchAsyncError(async(req,res,next) => {
  res.status(201).cookie("token", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  }).json({
    success: true,
    message: "User logged out successfully!"
  })
})

export const getUser = catchAsyncError(async (req,res,next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});