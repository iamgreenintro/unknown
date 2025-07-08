import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseInterface } from '../data-structures/response';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly API_ROOT_URL: string = 'http://localhost:3001';
  constructor(private readonly http: HttpClient) {}

  public get(route: string): Promise<ResponseInterface> {
    return this.convertToPromise(
      this.http.get<ResponseInterface>(`${this.API_ROOT_URL}` + route)
    );
  }

  public post(route: string, payload: unknown): Promise<ResponseInterface> {
    return this.convertToPromise(
      this.http.post<ResponseInterface>(`${this.API_ROOT_URL}` + route, payload)
    );
  }

  /**
   * @param observable an Observable
   * @returns An Observable converted to a Promise.
   * @description Convert an Observable to a Promise for a more readable style of programming instead of logic nested inside a subscribe.
   */
  public convertToPromise(
    observable: Observable<ResponseInterface>
  ): Promise<ResponseInterface> {
    // Could use rxjs' firstValueFrom(), but alas.
    return new Promise((resolve, reject) => {
      observable.subscribe({
        next: (value) => {
          // console.log(value);
          resolve(value);
        },
        error: (error) => {
          // console.trace(error);
          if (error instanceof HttpErrorResponse) {
            resolve(error.error);
          } else {
            resolve(error);
          }
        },
        complete: () => {
          // console.log('Completed');
        },
      });
    });
  }
}
