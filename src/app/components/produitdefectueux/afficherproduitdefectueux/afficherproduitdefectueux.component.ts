import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitModule } from 'app/module/produit.module';
import { ProduitService } from 'app/service/produit/produit.service';
import { ProduitdefectueuxModule } from 'app/module/produitdefectueux.module';
import { ProduitdefectueuxService } from 'app/service/produitdefectueux/produitdefectueux.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-afficherproduitdefectueux',
  templateUrl: './afficherproduitdefectueux.component.html',
  styleUrls: ['./afficherproduitdefectueux.component.scss']
})
export class AfficherproduitdefectueuxComponent implements OnInit {
  produitdefectueux: ProduitdefectueuxModule;

  constructor(
    private produitService: ProduitService,
    private produitdefectueuxService:ProduitdefectueuxService,
    private route: ActivatedRoute,
    private router: Router,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
this.produitdefectueuxService.getProduitdefectueux(id).subscribe(produitdefectueux=>{
  this.produitdefectueux=produitdefectueux;
  this.produitService.getProduit(produitdefectueux.idproduit).subscribe(produit=>this.produitdefectueux.produit=produit)
})
  }
  onModify(): void {
    this.router.navigate(['/modifierproduitdefectueux', this.produitdefectueux.id]);
  }

  onDelete(): void {
    this.produitdefectueuxService.deleteProduitdefectueux(this.produitdefectueux.id)
    
      .subscribe(() => {
        alert(' produit deleted!');
        this.router.navigate(['/produitdefectueux/lister']);
      });
  }
}
