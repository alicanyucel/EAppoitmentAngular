import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http:HttpClient
  ) { }
  post(apiUrl:string){
    this.http.post(``,body).subscribe({
      next:(res=>{

      }),
      error:()
    })
  }
}
