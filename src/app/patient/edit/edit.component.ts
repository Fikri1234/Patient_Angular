import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { PatientService } from '../patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../patient';
import { ResponseApi } from '../../model/response-api.model';
import { first } from 'rxjs';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  id!: number;
  patient!: Patient;
  form!: FormGroup;
  constructor(
    public patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      patientAddressDTO: new FormGroup({
        id: new FormControl(''),
        address: new FormControl(''),
        suburb: new FormControl(''),
        state: new FormControl(''),
        postcode: new FormControl(''),
      }),
    });

    this.id = this.route.snapshot.params['postId'];
    if (this.id) {
      this.patientService.find(this.id).pipe(first()).subscribe((resp: ResponseApi) => {
        this.patient = resp.data as Patient;
        this.form.patchValue(this.patient);
      });
    }
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      console.log('Profile form data :: ', this.form.value);
      this.patientService.update(this.form.value).subscribe((res: any) => {
        console.log('Patient created successfully!');
        this.router.navigateByUrl('patient/index');
      });
    }
  }
}
