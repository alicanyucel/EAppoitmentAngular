import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormValidateDirective } from 'form-validate-angular';
import { RouterLink } from '@angular/router';
import { GenericService } from '../../Services/generic.service';
import { PatientModel } from '../../Models/patient.model';
import { SwalService } from '../../Services/swal.service';
import { UserPipe } from '../../pipe/user.pipe';
import { UserModel } from '../../Models/user.model';
import { RoleModel } from '../../Models/role.model';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, FormValidateDirective, UserPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: UserModel[] = [];  
  roles: RoleModel[] = [];

  @ViewChild("addModalCloseBtn") addModalCloseBtn: ElementRef<HTMLButtonElement> | undefined;
  @ViewChild("updateModalCloseBtn") updateModalCloseBtn: ElementRef<HTMLButtonElement> | undefined;

  createModel: UserModel = new UserModel();
  updateModel: UserModel = new UserModel();

  search: string = "";

  constructor(
    private http: GenericService,
    private swal: SwalService
  ){}

  ngOnInit(): void {
    this.getAll();
    this.getAllRoles();
  }

  getAll(){
    this.http.post<UserModel[]>("Users/GetAll", {}, (res)=> {
      this.users = res.data;
    });
  }

  getAllRoles(){
    this.http.post<RoleModel[]>("Users/GetAllRoles",{}, res=> {
      this.roles = res.data;
    });
  }
  
  add(form: NgForm){
    if(form.valid){
      this.http.post<string>("Users/Create",this.createModel,(res)=> {
        this.swal.callToast(res.data,"success");
        this.getAll();
        this.addModalCloseBtn?.nativeElement.click();
        this.createModel = new UserModel();
      });
    }
  }

  delete(id: string, fullName: string){
    this.swal.calSwal("Delete user?",`You want to delete ${fullName}?`,()=> {
      this.http.post<string>("Users/DeleteById", {id: id}, (res)=> {
        this.swal.callToast(res.data,"info");
        this.getAll();
      })
    })
  }

  get(data: UserModel){    
    this.updateModel = {...data};
    console.log(this.updateModel);
        
  }

  update(form:NgForm){
    if(form.valid){
      this.http.post<string>("Users/Update",this.updateModel,(res)=> {
        this.swal.callToast(res.data,"success");
        this.getAll();
        this.updateModalCloseBtn?.nativeElement.click();        
      });
    }
  }
}