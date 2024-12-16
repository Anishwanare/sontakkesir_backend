import { Student } from "../Model/StudentModel.js";
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./error.js ";
import jwt from "jsonwebtoken"

export const isAuthenticate = catchAsyncError(async (req, res, next) => {
    const token = req.cookies.Student_Token;

    if (!token) {
        return next(new ErrorHandler("Student is not Authenticated", 401))
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.student = await Student.findById(decoded.id)
        next()
    } catch (error) {
        return next(new ErrorHandler("Token Invalid or expires", 401))
    }
})


export const isAuthorized = (...roles) => {
    return (req, res, next) => {
        try {
            if (!roles.includes(req.student?.role)) {
                return next(new ErrorHandler("Student is not Authorized ", 401))
            }
            next()
        } catch (error) {
            return next(new ErrorHandler(error.message || "Internal Server Error", 500))
        }
    }
}