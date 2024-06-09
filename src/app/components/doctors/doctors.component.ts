import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import {GenericService} from '../../Services/generic.service';
import { DoctorModel } from '../../Models/doctor.model';
import { response } from 'express';
import { CommonModule } from '@angular/common';
import { departments } from '../../Constans/constans';
import { FormValidateDirective } from 'form-validate-angular';
import { FormsModule, NgForm } from '@angular/forms';
import { DoctorPipe } from '../../pipe/doctor.pipe';
import { SwalService } from '../../Services/swal.service';
@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [RouterLink,CommonModule,FormValidateDirective,FormsModule,DoctorPipe],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent  implements OnInit{
@ViewChild("addModelCloseBtn") addModalCloseBtn:ElementRef<HTMLButtonElement>| undefined;
doctors:DoctorModel[]=[];
departments=departments;
createModel:DoctorModel=new DoctorModel();
search:string="";
constructor(private http:GenericService,private swall:SwalService) {}
  ngOnInit(): void {
    this.getAll();
    this.swall.callToast("Deneme","success");
    }
  add(form:NgForm){
    if(form.valid){
      this.http.post<string>("Doctors/Create",this.createModel,(res)=>{
        console.log(res);
        this.getAll();
      this.addModalCloseBtn?.nativeElement.click();
      this.createModel=new DoctorModel();
      })
    }
  }
getAll(){
  this.http.post<DoctorModel[]>("Doctors/GetAll",{},(res)=>{
  this.doctors=res.data;
  });
}
}
