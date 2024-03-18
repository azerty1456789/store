import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RangementModule } from 'app/module/rangement.module';
import { RangementService } from 'app/service/rangement/rangement.service';
import { ColonneModule } from 'app/module/colonne.module';
import { ColonneService } from 'app/service/colonne/colonne.service';
import { DepotModule } from 'app/module/depot.module';
import { DepotService } from 'app/service/depot/depot.service';
import { ProduitModule } from 'app/module/produit.module';
import { ProduitService } from 'app/service/produit/produit.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-afficherrangement',
  templateUrl: './afficherrangement.component.html',
  styleUrls: ['./afficherrangement.component.scss']
})
export class AfficherrangementComponent implements OnInit {
rangement: RangementModule;
colonne:ColonneModule;
depot:DepotModule;
produit:ProduitModule;
  constructor(
      private rangementService:RangementService,
      private colonneService:ColonneService,
      private produitService:ProduitService,
      private depotService:DepotService,
      private route: ActivatedRoute,
      private router: Router,
      private _translateService: CoreTranslationService) {
        this._translateService.translate(english, french, arabic);
  
       }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.rangementService.getRangement(id).subscribe((rangement) => {
      this.rangement = rangement;
      this.colonneService.getColonne(this.rangement.idcolonne).subscribe((colonne) =>{
        this.colonne = colonne;
        this.depotService.getDepot(this.colonne.iddepot).subscribe((depot) =>{
          this.depot = depot;
        });
        this.produitService.getProduit(this.rangement.idproduit).subscribe((produit) =>{
          this.produit = produit;
        });
      });
     
  });

  }
  onModify(): void {
    this.router.navigate(['/modifierrangement', this.rangement.id]);
  }
  
  onDelete(): void {
    this.rangementService.deleteRangement(this.rangement.id)
    
      .subscribe(() => {
        alert(' rangement deleted!');
        this.router.navigate(['/depot/lister']);
      });
  }
}
