import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandeligneclientModule } from './commandeligneclient.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CommandeclientModule {
  id: number;
  datecommande: Date;
  idclientweb: number;
  total: number;
  etat:string;
  commandeligneclient: CommandeligneclientModule[];
 }
