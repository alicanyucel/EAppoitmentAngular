import { DepartmentModel } from "./department.model";

export class DoctorModel{
    id:string="";
    firstName:string="";
    lastName:string="";
    department:DepartmentModel=new DepartmentModel();
    fullName:string="";
}
