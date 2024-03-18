import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepotModule } from './depot.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ColonneModule {
  id: number; 
  nom: string;
  description: string;
  iddepot: number;
  depot:DepotModule
 }
