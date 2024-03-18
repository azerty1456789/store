import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class FermeturecaisseModule {
  id: number;
  montantdebut: number;
  idemployee?: number;
  dernierefactureid?: number;
  totalcash: number;
  totalcheck: number;
  totalticketresto: number;
  ecartcash: number;
  ecartcheck: number;
  ecartticketresto: number;
  datefermeture: Date;
  dateouverture: Date;

 }
