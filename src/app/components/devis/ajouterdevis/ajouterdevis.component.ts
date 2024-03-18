import { Component, OnInit } from '@angular/core';
import { DevisModule } from 'app/module/devis.module';
import { DevisligneproduitModule } from 'app/module/devisligneproduit.module';
import { ProduitModule } from 'app/module/produit.module';
import { ProduitService } from 'app/service/produit/produit.service';
import { DevisService } from 'app/service/devis/devis.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-ajouterdevis',
  templateUrl: './ajouterdevis.component.html',
  styleUrls: ['./ajouterdevis.component.scss']
})
export class AjouterdevisComponent implements OnInit {
  total=0;
  devis: DevisModule = {
    id: 0,
    datedevis: undefined,
    total: 0,
    devisligneproduit: []
  };

  devisligneproduits: DevisligneproduitModule []=[];

  devisligneproduit: DevisligneproduitModule ={
    DevisId: 0,
    produitId: 0,
    quantite: 0,
    produit: new ProduitModule,
    prix: 0
  }
  produit: ProduitModule = new ProduitModule();
  barcode: string;
  constructor(private devisService:DevisService,
   private produitService:ProduitService,
   private _translateService: CoreTranslationService) {
     this._translateService.translate(english, french, arabic);

    }

  ngOnInit(): void {
  }
  onSubmit() {
    const devis= new DevisModule();
    devis.datedevis=new Date;
    devis.devisligneproduit=this.devisligneproduits;
    devis.total=this.total;

  this.devisService.addDevis(devis).subscribe(
    (response) => {
      console.log(response);
      this.devis={
        id: 0,
        datedevis: undefined,
        total: 0,
        devisligneproduit: []
    };
        alert('New devis added successfully!');
      },
      (error) => {
        console.log(error);
        // show an error message
        alert('Error adding new devis !');
      }
    );
      };
  
 
      addDevisLigneproduit() {
        const devisligneproduit = new DevisligneproduitModule();
        devisligneproduit.quantite = this.devisligneproduit.quantite;
        devisligneproduit.prix = this.devisligneproduit.produit.prixvente+(this.devisligneproduit.produit.prixvente*this.devisligneproduit.produit.taxe/100)-(this.devisligneproduit.produit.prixvente*this.devisligneproduit.produit.reductionprix/100);
      
        const existingLigne = this.devisligneproduits.find(ligne => ligne.produit.codebar.toString() == this.barcode);
        if (existingLigne) {
          existingLigne.quantite += this.devisligneproduit.quantite;
          this.updateTotal(); 

        } else {
          this.produitService.getProductByBarcode(this.barcode.toString()).subscribe(
            produit => {
              devisligneproduit.produit = produit;
              devisligneproduit.produitId = produit.id;
              devisligneproduit.prix = devisligneproduit.produit.prixvente+(devisligneproduit.produit.prixvente*devisligneproduit.produit.taxe/100)-(devisligneproduit.produit.prixvente*devisligneproduit.produit.reductionprix/100);;
      
              this.devisligneproduits.push(devisligneproduit);
              this.updateTotal(); 

            },
            error => console.log(error)
          );
        }
      }
        
      removeLigne(devisligneproduit: any) {
        const index = this.devisligneproduits.indexOf(devisligneproduit);
        if (index > -1) {
          this.total -= devisligneproduit.quantite * (devisligneproduit.produit.prixvente+(devisligneproduit.produit.prixvente*devisligneproduit.produit.taxe/100)-(devisligneproduit.produit.prixvente*devisligneproduit.produit.reductionprix/100));
      
          this.devisligneproduits.splice(index, 1);
          this.updateTotal(); // call updateTotal() function after removing a product
        }
      }
      
      updateTotal() {
        this.total= this.devisligneproduits.reduce((acc, devisligneproduit) => acc + devisligneproduit.quantite*(devisligneproduit.produit.prixvente+(devisligneproduit.produit.prixvente*devisligneproduit.produit.taxe/100)-(devisligneproduit.produit.prixvente*devisligneproduit.produit.reductionprix/100)), 0);
      }
}
