import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactureligneproduitModule } from './factureligneproduit.module';
import { TicketrestoModule } from './ticketresto.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class FactureclientModule {

          id: number;
          datefacture: Date;
          idclient: number;
          modepayment: string;
          total: number;
          totalticketresto:number;
          montantpaye: number;
          montantretourne: number;
          HorsTax: number;
          TVA1: number;
          TVA2: number;
          factureligneProduits: FactureligneproduitModule[];
          checkproprietaire: string;
          checkcompte: string;
          ticketrestos: TicketrestoModule[];
          iduser:number;
timbrefiscal:number;
numeroticket:number;
 }
