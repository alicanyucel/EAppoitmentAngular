import { Pipe, PipeTransform } from '@angular/core';
import { PatientModel } from '../Models/patient.model';

@Pipe({
  name: 'patient',
  standalone: true
})
export class PatientPipe implements PipeTransform {

  transform(value: PatientModel[],search:string): PatientModel[]{
    if(!search) {
      return value;
    }
    return value.filter(p=>
      p.fullName.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      p.city.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      p.town.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      p.identityNumber.toString().includes(search)
    )
  }
}
