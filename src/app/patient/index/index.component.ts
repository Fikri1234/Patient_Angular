import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Patient } from '../patient';
import { PatientService } from '../patient.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table'
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { ResponseApiPaged } from '../../model/response-api-paged.model';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule, MatPaginatorModule, NgxPaginationModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'dateOfBirth', 'gender', 'phone', 'address', 'suburb', 'state', 'postcode', 'action'];
  patient!: Patient;
  patients: Patient[] = [];
  totalItems = 0;
  totalPages = 0;
  page = 0;
  size = 10;

  constructor(public patientService: PatientService) {}

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.getAllPaginated(this.patient)
  }

  numberOfPages() {
    return Math.ceil(this.patients.length / this.size);
  };

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.getAllPaginated(this.patient);
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  getAllPaginated(patient: Patient){
    this.patientService.getAllPaginated(this.page, this.size, patient).subscribe((resp: ResponseApiPaged)=>{

      this.patients = resp.data as any;
      this.page = resp.page;
      this.totalPages = resp.totalPages;
      this.totalItems = resp.totalElement;
      console.log(this.patients);
    })
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  deletePatient(id:number){
    this.patientService.delete(id).subscribe(res => {
         this.patients = this.patients.filter(item => item.id !== id);
         this.totalItems = this.totalItems - 1;
         console.log('Patient deleted successfully!');
    })
  }

}
