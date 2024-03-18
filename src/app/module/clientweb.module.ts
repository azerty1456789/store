import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ClientwebModule {
  id: number;
  nom: string;
  prenom: string;
  telephone: number;
  email: string;
  adresse: string;
 }
