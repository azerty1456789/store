import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

import { ProduitModule } from 'app/module/produit.module';
import { ProduitService } from 'app/service/produit/produit.service';
import { ProduitdefectueuxModule } from 'app/module/produitdefectueux.module';
import { ProduitdefectueuxService } from 'app/service/produitdefectueux/produitdefectueux.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
  @Component({
  selector: 'app-modifierproduitdefectueux',
  templateUrl: './modifierproduitdefectueux.component.html',
  styleUrls: ['./modifierproduitdefectueux.component.scss']
})
export class ModifierproduitdefectueuxComponent implements OnInit {
  produitdefectueux:ProduitdefectueuxModule
  produitdefectueuxId:number
  constructor( private route: ActivatedRoute,
    private router: Router,
    private ProduitService:ProduitService,
    private ProduitdefectueuxService:ProduitdefectueuxService,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

  ngOnInit(): void {  this.route.paramMap.subscribe(params => {
    this.produitdefectueuxId = +params.get('id');
    this.ProduitdefectueuxService.getProduitdefectueux(this.produitdefectueuxId).subscribe(produitdefectueux=>{
      this.ProduitService.getProduit(produitdefectueux.idproduit).subscribe(produit=>produitdefectueux.produit=produit)
      this.produitdefectueux=produitdefectueux
    })
  })
  }
  onSubmit() {
    this.ProduitdefectueuxService.updateProduitdefectueux(this.produitdefectueux).subscribe(
      (response) => {
        console.log(response);
        // show a success message
        alert('Produit defectueux updated successfully!');
        this.router.navigate(['/produitdefectueux/lister']);
      },
      (error) => {
        console.log(error);
        // show an error message
        alert('Error updating Produit defectueux!');
      }
    )
  }
}
