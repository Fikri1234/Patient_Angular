import { PatientAddress } from "./patient-address";

export interface Patient {
  id: number;
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  gender: string;
  patientAddressDTO: PatientAddress;
  phone: string;
}
