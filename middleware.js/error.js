class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
};

export const errorMiddleWare = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500

    if (err.name === "JsonWebTokenError") {
        const message = "JSON web token is not valid, Please try again",
            err = new ErrorHandler(message, 400)
    }

    if (err.name === "TokenExpiredError") {
        const message = "JSON web token is expired, Please try again"
        err = new ErrorHandler(message, 400)
    }

    if (err.name === "CastError") {
        const message = `invalid ${err.path}`
        err = new ErrorHandler(message, 400)
    }

    const errorMessage = err.errors ? Object.values(err.errors).map((err) => err.message).join(" ") : err.message

    return res.staus(err.statusCode).json({
        message: errorMessage,
        success: false
    })
}

export default ErrorHandler;