import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor() { }
  errorHandler(error: {
    error: {
      messge: string;
    };
    status: any;
    message: any;
  }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.messge;
    } else {
      errorMessage = `${error.error.messge}`;
    }
    console.log(error);
    return throwError(errorMessage);
  }
}
