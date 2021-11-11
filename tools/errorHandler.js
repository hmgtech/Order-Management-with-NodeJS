const HttpStatus = require('http-status-codes').StatusCodes;
const errorMessage = require('../tools/errorMessages')

exports.errorHandler = (err, req) => {
    console.log(err);
    let status = 500
    let message = "Some error occurred."
    if (err.parent.errno === 1452){
      return {
        status: 404,
        message: `ID ${ req.body.customer_id} doesnot exist.`
      };
    }
    if (err.parent.errno === 1009){
      return {
        status: 404,
        message: `ID ${ req.body.customer_id} doesnot exist.`
      };
    }
    else{
      return {
        status: status,
        message: err.message || message
      };
    }
  }

exports.internalServerError = (err) =>{
    return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${errorMessage.SOMETHING_WENT_WRONG} => ${err.message}`
    }
}


exports.accessDenied = () =>{
    return {
        status: HttpStatus.FORBIDDEN,
        message: errorMessage.ACCESS_DENIED
    }
}

exports.badRequest = () => {
    return {
        status: HttpStatus.BAD_REQUEST,
        message: errorMessage.ACCESS_DENIED
    }
}

exports.allFieldsRequired = () => {
    return {
        status: HttpStatus.BAD_REQUEST,
        message: errorMessage.ALL_FIELD_REQUIRED
    }
}


exports.successfullyUpdated= (num) => {
    return {
        status: HttpStatus.OK,
        message: `${num} ${errorMessage.SUCCESSFUL_UPDATED}`
    }
}

exports.notUpdated = (id) => {
    return {
        status: HttpStatus.BAD_REQUEST,
        message: `ID: ${id} => ${errorMessage.NOT_UPDATED}`
    }
}


exports.successfullyDeleted = (num) => {
    return {
        status: HttpStatus.OK,
        message: `${num} ${errorMessage.SUCCESSFUL_DELETED}`
    }
}

exports.notDeleted = (id) => {
    return {
        status: HttpStatus.BAD_REQUEST,
        message: `ID: ${id} => ${errorMessage.NOT_DELETED}`
    }
}

