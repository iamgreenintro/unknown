import { ResponseInterface } from '../data-structures/interfaces/response';

export class ResponseBuilder {
  static SUCCESS_CODES = {
    SUCCESS: 200,
    CREATED: 201,
    NO_CONTENT: 204,
  };

  static REDIRECT_CODES = {
    MOVED_PERMANENTLY: 301,
    NOT_MODIFIED: 304,
    REDIRECT_TEMPORARILY: 307,
    REDIRECT_PERMANENTLY: 308,
  };

  static ERROR_CODES = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401, // Unauthenticated
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403, // Unauthorized but authenticated
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    CONFLICT: 409,
    UNSUPPORTED_MEDIA_TYPE: 415,
    TOO_MANY_REQUESTS: 429,
    UNAVAILABLE_LEGAL_REASONS: 415,
  };

  static successResponse<T>(
    data: T,
    options: Partial<Omit<ResponseInterface<T>, 'data' | 'error'>> = {}
  ): ResponseInterface<T> {
    return {
      data,
      message: options.message ?? 'Success',
      error: false,
      code: options.code ?? 200,
    };
  }

  static errorResponse<T>(
    options: Partial<Omit<ResponseInterface<T>, 'data' | 'error'>> = {}
  ): ResponseInterface<T> {
    return {
      data: null,
      message: options.message ?? 'Error',
      error: true,
      code: options.code ?? 400,
    };
  }
}
