import config from '../config/index.js'
import loggerUtil from './logger.js'
import messageUtil from './message.js'

const successResponse = (res, message, data) => {
    const response = {
        success: true,
        message: message
    }
    if (data) {
        response.data = data
    }
    res.status(config.HTTP_STATUS_CODES.OK).send(response)
}

const serverErrorResponse = (res, error) => {
    loggerUtil.error({
        message: error.toString(),
        level: 'error'
    })
    res.status(config.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({
        success: false,
        error: error.toString(),
        message: messageUtil.serverError
    })
}

const validationErrorResponse = (res, message) => {
    res.status(config.HTTP_STATUS_CODES.OK).send({
        success: false,
        message: message,
        error: messageUtil.validationErrors
    })
}

const badRequestErrorResponse = (res, message) => {
    res.status(config.HTTP_STATUS_CODES.BAD_REQUEST).send({
        success: false,
        message
    })
}

const authorizationErrorResponse = (res, message) => {
    res.status(config.HTTP_STATUS_CODES.UNAUTHORIZED).send({
        success: false,
        message
    })
}

const manyRequestErrorResponse = (res, message) => {
    res.status(config.HTTP_STATUS_CODES.TOO_MANY_REQUESTS).send({
        success: false,
        message
    })
}

export default {
    successResponse,
    serverErrorResponse,
    validationErrorResponse,
    badRequestErrorResponse,
    authorizationErrorResponse,
    manyRequestErrorResponse
}
