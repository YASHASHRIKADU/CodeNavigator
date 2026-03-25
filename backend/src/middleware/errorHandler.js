/**
 * Central error handler middleware.
 * Must be the LAST middleware mounted in server.js.
 */
const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message    = err.message || 'Internal Server Error';

    // Mongoose: Duplicate key error
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        message    = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
        statusCode = 409;
    }

    // Mongoose: Validation error
    if (err.name === 'ValidationError') {
        message    = Object.values(err.errors).map(e => e.message).join(', ');
        statusCode = 400;
    }

    // Mongoose: Cast error (invalid ObjectId)
    if (err.name === 'CastError') {
        message    = `Invalid ${err.path}: ${err.value}`;
        statusCode = 400;
    }

    // JWT
    if (err.name === 'JsonWebTokenError') {
        message    = 'Invalid token';
        statusCode = 401;
    }

    if (process.env.NODE_ENV !== 'production') {
        console.error(`[Error] ${statusCode} — ${message}`);
    }

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

module.exports = errorHandler;
