export class ApiError extends Error {
    public status: number

    constructor(status: number, message: string) {
        super(message)
        this.status = status

        Object.setPrototypeOf(this, ApiError.prototype)
    }

    static badRequest(message: string) {
        return new ApiError(400, message)
    }

    static unauthorized(message = 'Unauthorized') {
        return new ApiError(401, message)
    }

    static forbidden(message = 'Forbidden') {
        return new ApiError(403, message)
    }

    static internal(message = 'Internal server error') {
        return new ApiError(500, message)
    }
}
