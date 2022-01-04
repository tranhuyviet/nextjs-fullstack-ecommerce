export default class ApiErrors extends Error {
    constructor(
        readonly statusCode: number,
        readonly message: string,
        readonly errors?: object
    ) {
        super();
    }
}

export class NotFoundError extends ApiErrors {
    constructor(readonly message: string = 'Not Found', errors?: any | null) {
        super(404, message, errors);
    }
}

export class BadRequestError extends ApiErrors {
    constructor(readonly message: string = 'Bad Request', errors?: any | null) {
        super(400, message, errors);
    }
}
