import { Component, OnInit } from '@angular/core';
import { ProduitModule } from 'app/module/produit.module';
import { ProduitService } from 'app/service/produit/produit.service';
import { DepotService } from 'app/service/depot/depot.service';
import { RangementModule } from 'app/module/rangement.module';
import { RangementService } from 'app/service/rangement/rangement.service';
import { ColonneService } from 'app/service/colonne/colonne.service';
import { ProduitdefectueuxModule } from 'app/module/produitdefectueux.module';
import { ProduitdefectueuxService } from 'app/service/produitdefectueux/produitdefectueux.service';
import { Router } from '@angular/router';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-ajouterproduitdefectueux',
  templateUrl: './ajouterproduitdefectueux.component.html',
  styleUrls: ['./ajouterproduitdefectueux.component.scss']
})
export class AjouterproduitdefectueuxComponent implements OnInit {
codebar:string
produit:ProduitModule
newProduitdefectueux:ProduitdefectueuxModule= {
  id: 0,
  idproduit: 0,
  quantite: 0,
  produit: new ProduitModule
}
rangements:RangementModule[]
  quantite: number;
  selectedrangement:number
  constructor(private produitService: ProduitService, 
    private depotService:DepotService,
    private colonneService:ColonneService,
    private rangementService:RangementService,
    private produitdefectueuxService:ProduitdefectueuxService,
    private router: Router,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

  ngOnInit(): void {
  }
  onSubmit() {
    const newProduitdefectueux = new ProduitdefectueuxModule();
    newProduitdefectueux.id=0
    newProduitdefectueux.idproduit=this.produit.id
    newProduitdefectueux.quantite=this.quantite

    console.log("produitdefectueux=",newProduitdefectueux)
console.log ("quantite=",this.quantite)
    this.produitdefectueuxService.getProduitdefectueuxs().subscribe(produitdefectueuxs=>{
      const filteredProduitdefectueuxs = produitdefectueuxs.filter(produitdefectueux => produitdefectueux.idproduit === this.produit.id);

      if (filteredProduitdefectueuxs.length>0){
        console.log("filteredProduitdefectueuxs=",filteredProduitdefectueuxs)
        filteredProduitdefectueuxs[0].quantite+=this.quantite
this.produitdefectueuxService.updateProduitdefectueux(filteredProduitdefectueuxs[0]).subscribe(
  (response)=>{
    console.log(response);
    alert('Produit defectueux updated successfully!');
        this.router.navigate(['/produitdefectueux/lister']);
  },
  (error) => {
    console.error('Failed to update produitdefectueux:', error);
    alert('Error updating Produit defectueux!');

  }
)
      }else{
        this.produitdefectueuxService.addProduitdefectueux(newProduitdefectueux).subscribe(
          (response)=>{
            console.log(response);
            alert('Produit defectueux created successfully!');
            this.router.navigate(['/produitdefectueux/lister']);
          },
          (error) => {
            console.error('Failed to create produitdefectueux:', error);
            alert('Error creating produit defectueux!');

          }
        )
      }
    })

    this.rangementService.getRangement(this.selectedrangement).subscribe(selectedrangement=>{
      selectedrangement.stock-=this.quantite
      this.rangementService.updateRangement(selectedrangement).subscribe(
        (response)=>{
          console.log(response);
        },
        (error) => {
          console.error('Failed to update rangement.stock:', error);
        }
      )
    })


  }


  getProduitByCodebar(){
    this.produitService.getProductByBarcode(this.codebar).subscribe(produit=>{
      this.produit=produit
    this.rangementService.getRangementsByProduitId(this.produit.id).subscribe(rangements=>{
    rangements.forEach(rangement=>{
      this.colonneService.getColonne(rangement.idcolonne).subscribe(colonne=>{
        rangement.colonne=colonne
this.depotService.getDepot(colonne.iddepot).subscribe(depot=>rangement.colonne.depot=depot)
      })
    })
    this.rangements=rangements
    console.log("rangements=",this.rangements)

    })
  })
  }
}
