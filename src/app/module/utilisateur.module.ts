import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UtilisateurModule {
  id: number;
  email: string;
  password: string;
  name:string;
  lastName:string;
  phone: number;
  role: string;
  token?: string;
  cin: number;
  typecontrat: string;
  salaire: number;
  salairebrut: number;
  permission: number;
  photo: string;
 }
