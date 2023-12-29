/**
     * @param {import("express").Response} res 
     * @param {string} message  
     * @param {any} data 
     * @param {number} status 
     */
export function responseOk(res, message, data, status = 200) {
    const response = {
        data,
        meta: {
            message,
            statusCode: status,
            time: new Date().toISOString()
        }
    }

    res.status(status)
    res.json(response)
}

/**
     * @param {import("express").Response} res 
     * @param {string} message  
     * @param {any} data 
     */
export function responseError(res, message, data, errorBag=[], statusCode=400) {
    const response = {
        data,
        meta: {
            errorBag,
            message,
            statusCode: statusCode,
            time: new Date().toISOString()
        }
    }

    res.status(statusCode)
    res.json(response)
}