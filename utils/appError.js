class AppError extends Error {
  constructor(message, statusCode) {
    
    // TODO : Call the parent Error class constructor and pass the error message
    super(message);

    // TODO : Store the provided statusCode and determine the status based on the statusCode
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

    // TODO :  Set the flag to indicate that this error is operational (intentional)
    this.isOperational = true;

    // TODO : Capture the stack trace for the error object
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
