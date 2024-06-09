import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }
  callToast(title:string,icon:SwetalertIcon="success"){
Swal.fire({
  title:title,
  timer:3000,
  icon:icon,
  toast:true,
 showCancelButton:false,
 showCloseButton:false
})
  }
}
export type SwetalertIcon='success' | 'error' | 'warning'| 'info' | 'question'
