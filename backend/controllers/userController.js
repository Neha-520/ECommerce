const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const User = require("../models/userModel")

//Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "this is sample id",
            url: "profilepicUrl"
        }
    });

    const token = user.getJWTToken();
    res.status(201).json({
        success: true,
        token
    })
})

//Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) return next(new ErrorHandler("Please Enter Email & password", 400))

    const user = User.findOne({ email }).select("+password");
    if (!user)
        return next(new ErrorHandler("Invalid email or password"), 401)

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched)
        return next(new ErrorHandler("Invalid email or password"), 401)

    const token = user.getJWTToken();
    res.status(200).json({
        success: true,
        token
    })
})