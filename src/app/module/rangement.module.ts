import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColonneModule } from './colonne.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class RangementModule { 
  id: number; 
  nom: string;
  description: string;
  idcolonne: number;
  idproduit: number;
  stock: number;
  stockpiece: number;
  colonne:ColonneModule
}
