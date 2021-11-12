const HttpStatus = require('http-status-codes').StatusCodes;
const errorMessage = require('./apiResponseMessages')

exports.errorHandler = (err, req) => {
    var datetime = new Date();
    console.log(err);
    let status = 500
    let message = "Some error occurred."
    if (err.parent.errno === 1452) {
        return {
            status: 404,
            message: `ID ${req.body.customer_id} doesnot exist.`,
            error: `NOT FOUND`,
            timestamp: datetime
        };
    }
    if (err.parent.errno === 1009) {
        return {
            status: 404,
            message: `ID ${req.body.customer_id} doesnot exist.`,
            error: `NOT FOUND`,
            timestamp: datetime
        };
    }
    else {
        return {
            status: status,
            message: err.message || message,
            error: `INTERNAL SERVER ERROR`,
            timestamp: datetime
        };
    }
}

exports.notFound = (item) => {
    var datetime = new Date();
    return {
        status: HttpStatus.NOT_FOUND,
        message: `${item} ${errorMessage.NOT_FOUND}`,
        error: `Not Found`,
        timestamp: datetime
    }
}

exports.internalServerError = (err) => {
    var datetime = new Date();
    return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${errorMessage.SOMETHING_WENT_WRONG} => ${err.message}`,
        error: `INTERNAL SERVER ERROR`,
        timestamp: datetime
    }
}

exports.accessDenied = () => {
    var datetime = new Date();
    return {
        status: HttpStatus.FORBIDDEN,
        message: errorMessage.ACCESS_DENIED,
        error: `FORBIDDEN`,
        timestamp: datetime
    }
}

exports.badRequest = () => {
    var datetime = new Date();
    return {
        status: HttpStatus.BAD_REQUEST,
        message: errorMessage.ACCESS_DENIED,
        error: `BAD_REQUEST`,
        timestamp: datetime
    }
}

exports.allFieldsRequired = () => {
    var datetime = new Date();
    return {
        status: HttpStatus.BAD_REQUEST,
        message: errorMessage.ALL_FIELD_REQUIRED,
        error: `BAD_REQUEST`,
        timestamp: datetime
    }
}

exports.successfullyUpdated = (num) => {
    var datetime = new Date();
    return {
        status: HttpStatus.OK,
        message: `${num} ${errorMessage.SUCCESSFUL_UPDATED}`,
        timestamp: datetime
    }
}

exports.successfullyCreated = () => {
    var datetime = new Date();
    return {
        status: HttpStatus.CREATED,
        message: `${errorMessage.RECORD_CREATED}`,
        timestamp: datetime
    }
}

exports.successfullyRetrived = () => {
    var datetime = new Date();
    return {
        status: HttpStatus.OK,
        message: `${errorMessage.SUCCESSFULLY_RETRIVED}`,
        timestamp: datetime
    }
}

exports.notUpdated = (id) => {
    var datetime = new Date();
    return {
        status: HttpStatus.BAD_REQUEST,
        message: `ID: ${id} => ${errorMessage.NOT_UPDATED}`,
        error: `BAD_REQUEST`,
        timestamp: datetime
    }
}

exports.successfullyDeleted = (num) => {
    var datetime = new Date();
    return {
        status: HttpStatus.OK,
        message: `${num} ${errorMessage.SUCCESSFUL_DELETED}`,
        timestamp: datetime
    }
}

exports.notDeleted = (id) => {
    var datetime = new Date();
    return {
        status: HttpStatus.BAD_REQUEST,
        message: `ID: ${id} => ${errorMessage.NOT_DELETED}`,
        error: `BAD_REQUEST`,
        timestamp: datetime
    }
}

