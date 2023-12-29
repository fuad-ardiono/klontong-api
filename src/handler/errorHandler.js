import { responseError } from "../utils/responseUtils.js";

export const ErrorHandler = (err, req, res, next) => {
    const errStatus = err.statusCode || 500;
    let errMsg = ''
    try {
        errMsg = err.errors[0].message
    } catch {
        errMsg = err.message || 'Something went wrong'
    }
    responseError(res, errMsg, null)
}