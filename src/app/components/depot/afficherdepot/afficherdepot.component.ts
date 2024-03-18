import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepotModule } from 'app/module/depot.module';
import { DepotService } from 'app/service/depot/depot.service';
import { ColonneModule } from 'app/module/colonne.module';
import { ColonneService } from 'app/service/colonne/colonne.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-afficherdepot',
  templateUrl: './afficherdepot.component.html',
  styleUrls: ['./afficherdepot.component.scss']
})
export class AfficherdepotComponent implements OnInit {
depot:DepotModule;
colonnes: ColonneModule[];

  constructor( private depotService: DepotService,
    private colonneService: ColonneService,
    private route: ActivatedRoute,
    private router: Router,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }


  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.depotService.getDepot(id).subscribe((depot) => {
      this.depot = depot;
      this.colonneService.getColonnesByDepotId(id).subscribe((colonnes) => {
        this.colonnes = colonnes;
      });
    });
  }

  onModify(): void {
    this.router.navigate(['/modifierdepot', this.depot.id]);
  }
  
  onDelete(): void {
    this.depotService.deleteDepot(this.depot.id)
    
      .subscribe(() => {
        alert(' depot deleted!');
        this.router.navigate(['/depot/lister']);
      });
  }

onCreateColonne(): void {
  this.router.navigate(['/depot', this.depot.id, 'ajoutercolonne']);
}

}
