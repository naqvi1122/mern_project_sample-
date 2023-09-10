import responseHelper from './response.js'
import logHelper from './logger.js'
// eslint-disable-next-line no-unused-vars

function errorHandler(err, req, res, next) {
    logHelper.error(err.message)

    if (typeof err === 'string') {
        // custom application error
        return responseHelper.badRequestError(res, err)
    }

    if (err.name === 'ValidationError') {
        // mongoose validation error
        return responseHelper.badRequestError(res, err.message)
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return responseHelper.authorizationError(res, err.message)
    }

    if (err.message === 'Not allowed by CORS') {
        // jwt authentication error
        return responseHelper.accessError(res, err.message)
    }

    return responseHelper.serverError(res, 'Erreur interne du serveur!')
}

export default errorHandler
