import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResultModel } from '../Models/result.model';
import { api } from '../Constans/constans';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  constructor(
    private http: HttpClient,private error:ErrorService) { }
    post<T>(apiUrl: string, body: any, callBack: (res: ResultModel<T>) => void, errorCallback?: (err: HttpErrorResponse) => void) {
      this.http.post<ResultModel<T>>(`${api}/${apiUrl}`, body).subscribe({
        next: (res => {
          callBack(res);
        }),
        error: (err: HttpErrorResponse) => {
          this.error.errorHandler(err);
          if (errorCallback!==undefined) {
            errorCallback(err);
          }
        }
      });
    }
  }
  