import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepotModule } from 'app/module/depot.module';
import { DepotService } from 'app/service/depot/depot.service';
import { ColonneModule } from 'app/module/colonne.module';
import { ColonneService } from 'app/service/colonne/colonne.service';
import { RangementModule } from 'app/module/rangement.module';
import { RangementService } from 'app/service/rangement/rangement.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-affichercolonne',
  templateUrl: './affichercolonne.component.html',
  styleUrls: ['./affichercolonne.component.scss']
})
export class AffichercolonneComponent implements OnInit {

  colonne:ColonneModule;
  rangements: RangementModule[];
  depot:DepotModule;
    constructor( private depotService: DepotService,
      private colonneService: ColonneService,
      private rangementService:RangementService,
      private route: ActivatedRoute,
      private router: Router,
      private _translateService: CoreTranslationService) {
        this._translateService.translate(english, french, arabic);
  
       }
  
  
    ngOnInit(): void {
      const id = +this.route.snapshot.paramMap.get('id');
      this.colonneService.getColonne(id).subscribe((colonne) => {
        this.colonne = colonne;
        this.rangementService.getRangementsByColonneId(id).subscribe((rangements) => {
          this.rangements = rangements;
        });
        this.depotService.getDepot(this.colonne.iddepot).subscribe((depot) =>{
          this.depot = depot;
        })
      });
    }
  

   

    onModify(): void {
      this.router.navigate(['/modifiercolonne', this.colonne.id]);
    }
    
    onDelete(): void {
      this.colonneService.deleteColonne(this.colonne.id)
      
        .subscribe(() => {
          alert(' colonne deleted!');
          this.router.navigate(['/depot/lister']);
        });
    }
  
  onCreateRangement(): void {
    this.router.navigate(['/colonne', this.colonne.id, 'ajouterrangement']);
  }
  
  }
  