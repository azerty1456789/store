import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { RangementModule } from 'app/module/rangement.module';
import { RangementService } from 'app/service/rangement/rangement.service';
import { ProduitModule } from 'app/module/produit.module';
import { switchMap } from 'rxjs/operators';
import { ColonneService } from 'app/service/colonne/colonne.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
import { ProduitService } from 'app/service/produit/produit.service';
@Component({
  selector: 'app-ajouterrangement',
  templateUrl: './ajouterrangement.component.html',
  styleUrls: ['./ajouterrangement.component.scss']
})
export class AjouterrangementComponent implements OnInit {
  produit:ProduitModule;
  depotid:number;
  newRangement: RangementModule = {
    id: null,
    nom: "",
    description: "",
    idcolonne: null,
    idproduit: null,
    stock:null,
    stockpiece:0,
    colonne:null
  }
  constructor(
    private produitService:ProduitService,
    private rangementService: RangementService,
    private route: ActivatedRoute,
    private colonneService:ColonneService,
    private router: Router,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

  ngOnInit(): void {
  }
  onSubmit() {
    this.produitService.getProductByBarcode(this.newRangement.idproduit.toString()).subscribe(produit=>{
    console.log(produit)
    const id = this.route.snapshot.paramMap.get('id');
  
    const newRangement = new RangementModule();
    newRangement.nom = this.newRangement.nom;
    newRangement.description = this.newRangement.description;
    newRangement.idcolonne = parseInt(id, 10);
    newRangement.idproduit = produit.id;
    newRangement.stock = this.newRangement.stock;
    newRangement.stockpiece = this.newRangement.stockpiece;
  
    this.colonneService.getColonne(newRangement.idcolonne).pipe(
      switchMap(colonne => {
        this.depotid = colonne.iddepot;
        return this.rangementService.getRangementsByProduitId(newRangement.idproduit);
      })
    ).subscribe(rangements => {
      const existingRangement = rangements.find(rangement => {
        return rangement.idcolonne === newRangement.idcolonne;
      });
      if (existingRangement) {
        alert("Product already exists in this depot!");
      } else {
        console.log(newRangement)
    this.rangementService.addRangement(newRangement).subscribe(
      (response) => {
        console.log(response);
        // clear the form and show a success message
        this.newRangement = {
          id: null,
          nom: "",
          description: "",
          idcolonne: null,
          idproduit: null,
          stock:null,
          stockpiece:0,
          colonne:null

  
        };
        alert('New Rangement added successfully!');
      },
      (error) => {
        console.log(error);
        // show an error message
        alert('Error adding new Rangement!');
      }
    ); 
      }
    });
    this.router.navigate(['/affichercolonne', this.route.snapshot.paramMap.get('id')]);
  
  })
    

  }
}

