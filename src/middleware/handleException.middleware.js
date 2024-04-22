
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode ?? 500;
    res.status(statusCode ?? 500).json({
        error: statusCode,
        message: err.message
    })
}

const notFoundHandler = (req, res, next) => {
    const error = new Error(`Not Found = ${req.originalUrl}`);
    res.status(404);
    next(error);
}

module.exports = {
    errorHandler,
    notFoundHandler
}

