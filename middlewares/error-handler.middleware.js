module.exports.errorHandlerMiddleware = (error, req, res, next) => {
    const formattedError = {
        message: error.message || 'An error occurs',
        code: error.statusCode || 500,
    }
    return res.status(formattedError.code).json({sucess: false, data:null, error: formattedError})
}