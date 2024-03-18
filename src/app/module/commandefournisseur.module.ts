import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandelignefournisseurModule } from './commandelignefournisseur.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CommandefournisseurModule {
  id: number;
  datecommande: Date;
  idfournisseur: number;
  total: number;
  etat:string;
  commandelignefournisseur: CommandelignefournisseurModule[];
  iduser: number;
  payee:boolean;
 }
