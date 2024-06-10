import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PatientModel } from '../../Models/patient.model';
import { GenericService } from '../../Services/generic.service';
import { SwalService } from '../../Services/swal.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormValidateDirective } from 'form-validate-angular';
import { PatientPipe } from '../../pipe/patient.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [CommonModule,FormsModule,FormValidateDirective,PatientPipe,RouterLink],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent implements OnInit {
 @ViewChild("addModelCloseBtn") addModalCloseBtn:ElementRef<HTMLButtonElement>| undefined;
  @ViewChild("updateModelCloseBtn") updateModalCloseBtn:ElementRef<HTMLButtonElement>| undefined;
  patients:PatientModel[]=[];
  createModel:PatientModel=new PatientModel();
  updateModel:PatientModel=new PatientModel();
  search:string="";
  constructor(private http:GenericService,private swall:SwalService) {}
    ngOnInit(): void {
      this.getAll();
      this.swall.callToast("Deneme","success");
      }
    add(form:NgForm){
      if(form.valid){
        this.http.post<string>("Patients/Create",this.createModel,(res)=>{
          console.log(res);
          this.getAll();
        this.addModalCloseBtn?.nativeElement.click();
        this.createModel=new PatientModel();
        })
      }
    }
  getAll(){
    this.http.post<PatientModel[]>("Patients/GetAll",{},(res)=>{
    this.patients=res.data;
    });
  }
  delete(id: string, fullName: string){
    this.swall.calSwal("Delete patients?",`You want to delete ${fullName}?`,()=> {
      this.http.post<string>("Patients/DeleteById", {id: id}, (res)=> {
        this.swall.callToast(res.data,"info");
        this.getAll();
      })
    })
  }
  get(data:PatientModel){
    this.updateModel={...data};
  }
  update(form:NgForm){
    if(form.valid){
      this.http.post<string>("Patients/Update",this.updateModel,(res)=>{
      this.swall.callToast(res.data,"success");
      this.getAll();
      this.updateModalCloseBtn?.nativeElement.click();
      });
    }
  }
  }
