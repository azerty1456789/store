import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoproduitModule } from './photoproduit.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ProduitModule { 
  id: number;
  codebar: number;
  nom: string;
  qteInPacket: number;
  color: string;
  description: string;
  categorieid: number;
  prixFournisseur: number;
  prixvente: number;
  dateexpiration: Date;
  ispiece: boolean;
  produitparent?: number;
  reductionprix:number;
  taxe:number;
  photoproduits:PhotoproduitModule[];
}
