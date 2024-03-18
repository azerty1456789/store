import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ClientModule { 
  id: number;
  name: string;
  lastname: string;
  priority: string;
  gender: string;
  phone: number;
  email: string;
  adresse: string;
  photo: string;
  credit: number;
}
