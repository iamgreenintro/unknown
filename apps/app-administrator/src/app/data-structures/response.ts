export interface ResponseInterface<T = unknown> {
  data: T;
  message: string;
  error: boolean;
  code: number;
}
