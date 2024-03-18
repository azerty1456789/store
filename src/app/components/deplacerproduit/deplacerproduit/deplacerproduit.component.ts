import { Component, OnInit } from '@angular/core';
import { ProduitModule } from 'app/module/produit.module';
import { ProduitService } from 'app/service/produit/produit.service';
import { ColonneModule } from 'app/module/colonne.module';
import { ColonneService } from 'app/service/colonne/colonne.service';
import { DepotModule } from 'app/module/depot.module';
import { DepotService } from 'app/service/depot/depot.service';
import { RangementModule } from 'app/module/rangement.module';
import { RangementService } from 'app/service/rangement/rangement.service';
import { Router } from '@angular/router';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-deplacerproduit',
  templateUrl: './deplacerproduit.component.html',
  styleUrls: ['./deplacerproduit.component.scss']
})
export class DeplacerproduitComponent implements OnInit {

selectedRangementFrom: number;
selectedRangementTo: number;
quantity: any;
barcode: number;
produit: ProduitModule
  rangements: RangementModule[];
  rangement:RangementModule
  colonnefrom:ColonneModule
  depotfrom:DepotModule
  colonneto:ColonneModule
  depotto:DepotModule
  rangementfrom: RangementModule;
  rangementto: RangementModule;
  constructor(private produitService:ProduitService,
    private depotService:DepotService,
    private colonneService:ColonneService,
   private rangementService:RangementService,
   private router: Router,
   private _translateService: CoreTranslationService) {
     this._translateService.translate(english, french, arabic);

    }
   ngOnInit(): void {
      }
      searchByBarcode() {
this.produitService.getProductByBarcode(this.barcode.toString()).subscribe(produit=>{
  this.produit=produit;
  this.rangementService.getRangementsByProduitId(this.produit.id).subscribe(rangements=>this.rangements=rangements)   

}) 

}
moveProduct() {
  this.rangementfrom.stock-=this.quantity
  this.rangementto.stock+=this.quantity

this.rangementService.updateRangement(this.rangementfrom).subscribe(
  (response) => {
    console.log(response);
  },
  (error) => {
    console.log(error);
  }
);
this.rangementService.updateRangement(this.rangementto).subscribe(
  (response) => {
    console.log(response);
  },
  (error) => {
    console.log(error);
  }
);
this.router.navigate(['home']);


}

onChangeRangementFrom() {
  this.rangementService.getRangement(this.selectedRangementFrom).subscribe(rangement=>{this.rangementfrom=rangement
    this.colonneService.getColonne(this.rangementfrom.idcolonne).subscribe(colonnefrom=>{
      this.colonnefrom=colonnefrom;
      this.depotService.getDepot(colonnefrom.iddepot).subscribe(depotfrom=>this.depotfrom=depotfrom)
    })
  })
  }



  onChangeRangementTo() {
    this.rangementService.getRangement(this.selectedRangementTo).subscribe(rangement=>{this.rangementto=rangement
      this.colonneService.getColonne(this.rangementto.idcolonne).subscribe(colonneto=>{
        this.colonneto=colonneto;
        this.depotService.getDepot(colonneto.iddepot).subscribe(depotto=>this.depotto=depotto)
      })
    })
   }
    
 

}
