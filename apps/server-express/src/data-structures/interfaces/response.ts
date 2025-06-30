export interface ResponseInterface<T = any> {
  data: T;
  message: string;
  error: boolean;
  code: number;
}
