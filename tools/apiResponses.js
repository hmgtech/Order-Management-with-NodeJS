const HttpStatus = require('http-status-codes').StatusCodes;
const errorMessage = require('./apiResponseMessages')


var datetime = new Date();
exports.errorHandler = (err, req) => {
    console.log(err);
    let status = 500
    let message = "Some error occurred."
    if (err.parent.errno === 1452){
      return {
        status: 404,
        message: `ID ${ req.body.customer_id} doesnot exist.`,
        error : `NOT FOUND`,
        timestamp: datetime
      };
    }
    if (err.parent.errno === 1009){
      return {
        status: 404,
        message: `ID ${ req.body.customer_id} doesnot exist.`,
        error : `NOT FOUND`,
        timestamp: datetime
      };
    }
    else{
      return {
        status: status,
        message: err.message || message,
        error : `INTERNAL SERVER ERROR`,
        timestamp: datetime
      };
    }
}

exports.notFound = () =>{
    return {
        status: HttpStatus.NOT_FOUND,
        message: `${errorMessage.NOT_FOUND}`,
        error : `Not Found`,
        timestamp: datetime
    }
}

exports.internalServerError = (err) =>{
    return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${errorMessage.SOMETHING_WENT_WRONG} => ${err.message}`,
        error : `INTERNAL SERVER ERROR`,
        timestamp: datetime
    }
}

exports.accessDenied = () =>{
    return {
        status: HttpStatus.FORBIDDEN,
        message: errorMessage.ACCESS_DENIED,
        error : `FORBIDDEN`,
        timestamp: datetime
    }
}

exports.badRequest = () => {
    return {
        status: HttpStatus.BAD_REQUEST,
        message: errorMessage.ACCESS_DENIED,
        error : `BAD_REQUEST`,
        timestamp: datetime
    }
}

exports.allFieldsRequired = () => {
    return {
        status: HttpStatus.BAD_REQUEST,
        message: errorMessage.ALL_FIELD_REQUIRED,
        error : `BAD_REQUEST`,
        timestamp: datetime
    }
}


exports.successfullyUpdated= (num) => {
    return {
        status: HttpStatus.OK,
        message: `${num} ${errorMessage.SUCCESSFUL_UPDATED}`,
        timestamp: datetime
    }
}

exports.successfullyCreated = () => {
    return {
        status: HttpStatus.CREATED,
        message: `${errorMessage.RECORD_CREATED}`,
        timestamp: datetime
    }
}

exports.successfullyRetrived = () => {
    return {
        status: HttpStatus.OK,
        message: `${errorMessage.SUCCESSFULLY_RETRIVED}`,
        timestamp: datetime
    }
}

exports.notUpdated = (id) => {
    return {
        status: HttpStatus.BAD_REQUEST,
        message: `ID: ${id} => ${errorMessage.NOT_UPDATED}`,
        error : `BAD_REQUEST`,
        timestamp: datetime
    }
}

exports.successfullyDeleted = (num) => {
    return {
        status: HttpStatus.OK,
        message: `${num} ${errorMessage.SUCCESSFUL_DELETED}`,
        timestamp: datetime
    }
}

exports.notDeleted = (id) => {
    return {
        status: HttpStatus.BAD_REQUEST,
        message: `ID: ${id} => ${errorMessage.NOT_DELETED}`,
        error : `BAD_REQUEST`,
        timestamp: datetime
    }
}

