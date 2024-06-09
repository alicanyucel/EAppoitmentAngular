import { ErrorHandler, Injectable } from '@angular/core';
import { SwalService } from './swal.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private swal: SwalService) { }

  errorHandler(err: HttpErrorResponse) {
    console.log(err);
    let message = "Error1";
    if (err.status === 0) {
      message = "api is not available";
    }
    else if (err.status === 404) {
      message = "api not found";
    }
    else if (err.status === 500) {
      for (const e of err.error.errorMessages) {
        message += e + '\n';
      }
    }
    this.swal.callToast(message, "error");
  }
}