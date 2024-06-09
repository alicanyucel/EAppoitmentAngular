import { Injectable } from '@angular/core';
import { title } from 'process';
import { timer } from 'rxjs';
import { text } from 'stream/consumers';
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
  text:'Basarılı',
  icon:icon,
  toast:true,
 showConfirmButton:false,
 position:'bottom-right',
 showCancelButton:false,
 showCloseButton:false
});
}
calSwal(title:string,text:string,callBack:()=>void)
{
  Swal.fire({
    title:title,
    text:text,
    icon:"question",
    showConfirmButton:true,
    confirmButtonText:"Delete",
    showCancelButton:true,
    cancelButtonText:"Cancel"}).then(res=>{
      if(res.isConfirmed)
        {
          callBack();
        }
  });
}
}
export type SwetalertIcon='success' | 'error' | 'warning'| 'info' | 'question'
