export class BadRequestError extends Error {
  code: number = 400;
  constructor(message: string = 'Bad request') {
    super(message);
    this.name = 'BadRequestError';

    // AI: Fix prototype chain for instanceof to work correctly
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export class UnauthorizedError extends Error {
  code: number = 401;
  constructor(message: string = 'Unauthorized') {
    super(message);
    this.name = 'UnauthorizedError';

    // AI: Fix prototype chain for instanceof to work correctly
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
