import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevisligneproduitModule } from './devisligneproduit.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DevisModule {
  id: number;
  datedevis:Date;
  total:number;
  devisligneproduit:DevisligneproduitModule[]
 }
