class ApiError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }

    static badRequest(msg) {
        return new ApiError(404, msg);
    }

    static unauthorizedUser() {
        return new ApiError(401, "You don't have access to this page, because you're an unauthorized user.");
    }

    static internal(msg) {
        return new ApiError(500, msg)
    }
}

export default ApiError;    