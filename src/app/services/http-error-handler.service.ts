import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService {

  constructor() { }

  handler(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.status === 0) {
      errorMessage = `Network error. Status was: ${error.status}.`;
    } else {
      errorMessage = `Backend response status: ${error.status}. Backend body: ${error.error.message}`;
    }
    return throwError(errorMessage);
  }

}
