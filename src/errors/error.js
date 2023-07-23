/**Error codes
 * 400 - Bad Request
 * 401 - Unauthorized
 * 404 - Not Found
 */

//Not found error
export class NotFoundError extends Error{
    constructor(message){
        super(message);
        this.status = 404;
        this.errorType = "NotFoundError";
    }
}

//Error with User Request
export class UserRequestError extends Error{
    constructor(message){
        super(message);
        this.status = 400;
        this.errorType = "UserRequestError"
    }
}

//Authentication Error
export class AuthenticationError extends Error{
    constructor(message){
        super(message);
        this.status = 401;
        this.errorType = "AuthenticationError"
    }
}