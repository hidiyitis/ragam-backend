import BaseError from "../base_classes/base-error.js";
import StatusCode from "../errors/status-codes.js";

export const errorHandler = (err, req, res, _next)=>{
    
    const statusCode = Object.values(StatusCode).find(
		(code) => code.code === err.statusCode,
	);
    
    if (err instanceof BaseError) {
        return res.status(statusCode.code).json({
            code: statusCode.code,
            status: statusCode.codeName,
            message: err.message || statusCode.message,
            pagination: null,
            data: null,
            errors: {
                name: err.name,
                message: err.message
            },
        })
    };
    
    return res.status(StatusCode.INTERNAL_SERVER_ERROR.code).json({
        code: StatusCode.INTERNAL_SERVER_ERROR.code,
        status: StatusCode.INTERNAL_SERVER_ERROR.codeName,
        message: StatusCode.INTERNAL_SERVER_ERROR.message,
        pagination: null,
        data: null,
        errors: {
            name: err.name,
            message: err.message
        },
    });
}