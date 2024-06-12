import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { GenericService } from '../../Services/generic.service';
import { AppointmentModel } from '../../Models/appointment.model';
import { CreateAppointmentModel } from '../../Models/CreateAppointment.model';
import { FormValidateDirective } from 'form-validate-angular';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
import { departments } from '../../Constans/constans';
import { DoctorModel } from '../../Models/doctor.model';
import { SwalService } from '../../Services/swal.service';
import { PatientModel } from '../../Models/patient.model';
import { DxSchedulerModule } from 'devextreme-angular';

declare const $: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, DxSchedulerModule, FormValidateDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [DatePipe]
})
export class HomeComponent {
  departments = departments;
  doctors: DoctorModel[] = [];

  @ViewChild("addModalCloseBtn") addModalCloseBtn: ElementRef<HTMLButtonElement> | undefined;

  selectedDepartmentValue: number = 0;
  selectedDoctorId: string = "";

  appointments: AppointmentModel[] = []

  createModel: CreateAppointmentModel = new CreateAppointmentModel();

  constructor(
    private http: GenericService,
    private date: DatePipe,
    private swal: SwalService
  ) { }

  getAllDoctor() {
    this.selectedDoctorId = "";
    if (this.selectedDepartmentValue > 0) {
      this.http.post<DoctorModel[]>("Appointments/GetAllDoctorByDepartment",
        { departmentValue: +this.selectedDepartmentValue }, (res) => {
          this.doctors = res.data;
        });
    }
  }

  getAllAppointments() {
    if (this.selectedDoctorId) {
      this.http.post<AppointmentModel[]>("Appointments/GetAllByDoctorId",
        { doctorId: this.selectedDoctorId }, (res) => {
          this.appointments = res.data;
        });
    }
  }

  onAppointmentFormOpening(e: any) {
    e.cancel = true;

    this.createModel.startDate = this.date.transform(e.appointmentData.startDate, "MM.dd.yyyy HH:mm") ?? "";
    this.createModel.endDate = this.date.transform(e.appointmentData.endDate, "MM.dd.yyyy HH:mm") ?? "";
    this.createModel.doctorId = this.selectedDoctorId;

    $("#addModal").modal("show");
  }

  getPatient() {
    this.http.post<PatientModel>("Appointments/GetPatientByIdentityNumber", { identityNumber: this.createModel.identityNumber }, res => {
      if (res.data === null) {
        this.createModel.firstName = "";
        this.createModel.lastName = "";
        this.createModel.city = "";
        this.createModel.town = "";
        this.createModel.fullAddress = "";
        this.createModel.patientId = null;
        return;
      }

      this.createModel.patientId = res.data.id;
      this.createModel.firstName = res.data.firstName;
      this.createModel.lastName = res.data.lastName;
      this.createModel.city = res.data.city;
      this.createModel.town = res.data.town;
      this.createModel.fullAddress = res.data.fullAddress;
    })
  }

  create(form: NgForm) {
    if (form.valid) {
      this.http.post<string>("Appointments/Create", this.createModel, res => {
        this.swal.callToast(res.data);
        this.addModalCloseBtn?.nativeElement.click();
        this.createModel = new CreateAppointmentModel();
        this.getAllAppointments();
      })
    }
  }

  onAppointmentDeleted(e: any) {
    e.cancel = true;
  }

  onAppointmentDeleting(e: any) {
    e.cancel = true;

    console.log(e);

    this.swal.calSwal("Delete appointment?", `You want to delete ${e.appointmentData.patient.fullName} appointment?`, () => {
      this.http.post<string>("Appointments/DeleteById", { id: e.appointmentData.id }, res => {
        this.swal.callToast(res.data, "info");
        this.getAllAppointments();
      });
    })
  }

  onAppointmentUpdating(e: any) {
    e.cancel = true;

    const data = {
      id: e.oldData.id,
      startDate: this.date.transform(e.newData.startDate, "MM.dd.yyyy HH:mm"),
      endDate: this.date.transform(e.newData.endDate, "MM.dd.yyyy HH:mm"),
    };

    this.http.post<string>("Appointments/Update", data, res => {
      this.swal.callToast(res.data);
      this.getAllAppointments();
    });
  }
}