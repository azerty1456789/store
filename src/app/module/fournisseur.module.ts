import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class FournisseurModule {
  id: number;
  nom: string;
  prenom: string ;
  telephone: number;
  email: string;
  adresse: string ;
  type: string ;
  code: number;
  description: string;
 }
