import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DepotModule { 
  id: number; 
  nom: string;
  adresse: string;
  type: string;
  description: string;
}
