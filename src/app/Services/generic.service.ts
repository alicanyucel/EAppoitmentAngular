import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResultModel } from '../Models/result.model';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  constructor(
    private http: HttpClient) { }
    post<T>(apiUrl: string, body: any, callBack: (res: ResultModel<T>) => void, errorCallback?: (err: HttpErrorResponse) => void) {
      this.http.post<ResultModel<T>>(`${apiUrl}`, body).subscribe({
        next: (res: ResultModel<T>) => {
          callBack(res);
        },
        error: (err: HttpErrorResponse) => {
          if (errorCallback) {
            errorCallback(err);
          }
        }
      });
    }
  }
  //ep https://localhost:7055/api/Auth/Loginy