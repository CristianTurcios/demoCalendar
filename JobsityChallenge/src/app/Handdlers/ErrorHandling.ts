import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  handleError(error: Error | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      console.log(
        'It seems like Wheather Map doesnt have the requested information'
      );
    } else {
      // Log the error
      console.error(error);
    }
  }
}
