import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResultModel } from '../Models/result.model';
import { api } from '../Constans/constans';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  constructor(
    private http: HttpClient) { }
    post<T>(apiUrl: string, body: any, callBack: (res: ResultModel<T>) => void, errorCallback?: (err: HttpErrorResponse) => void) {
      this.http.post<ResultModel<T>>(`${api}/${apiUrl}`, body).subscribe({
        next: (res => {
          if(res.data!==undefined || res.data !==null)
            {
          callBack(res);
            }
        }),
        error: (err: HttpErrorResponse) => {
          if (errorCallback!==undefined) {
            errorCallback(err);
          }
        }
      });
    }
  }
  