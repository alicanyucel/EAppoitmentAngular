import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {GenericService} from '../../Services/generic.service';
import { DoctorModel } from '../../Models/doctor.model';
import { response } from 'express';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent  implements OnInit{

doctors:DoctorModel[]=[];
constructor(private http:GenericService) {}
  ngOnInit(): void {
    this.getAll();
  }
getAll(){
  this.http.post<DoctorModel[]>("Doctors/GetAll",{},(res)=>{
  this.doctors=res.data;
  });
}
}
