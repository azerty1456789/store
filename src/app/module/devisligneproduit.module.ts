import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitModule } from './produit.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DevisligneproduitModule { 
  DevisId: number;
  produitId: number;
  quantite: number;
  prix:number;
  produit: ProduitModule;
}
