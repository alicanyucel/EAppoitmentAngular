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
@ViewChild("updateModelCloseBtn") updateModalCloseBtn:ElementRef<HTMLButtonElement>| undefined;
doctors:DoctorModel[]=[];
departments=departments;
createModel:DoctorModel=new DoctorModel();
updateModel:DoctorModel=new DoctorModel();
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
delete(id: string, fullName: string){
  this.swall.calSwal("Delete doctor?",`You want to delete ${fullName}?`,()=> {
    this.http.post<string>("Doctors/DeleteById", {id: id}, (res)=> {
      this.swall.callToast(res.data,"info");
      this.getAll();
    })
  })
}
get(data:DoctorModel){
  this.updateModel={...data};
  this.updateModel.departmentValue=data.department.value;

}
update(form:NgForm){
  if(form.valid){
    this.http.post<string>("Doctors/Update",this.updateModel,(res)=>{
    this.swall.callToast(res.data,"success");
    this.getAll();
    this.updateModalCloseBtn?.nativeElement.click();
    });
  }
}
}
// sorun çözüldü