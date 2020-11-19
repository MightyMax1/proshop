
//send json when error eccur
const errorHandler = (err, req, res, next) => {
    const statusCode = (res.statusCode == 200) ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV == "development" ? err.stack : none
    })

    next()
}


const notFound = (req, res, next) => {
    const err = new Error(`page not found - ${req.originalUrl}`)
    res.status(404)
    next(err)
}


export { errorHandler, notFound }