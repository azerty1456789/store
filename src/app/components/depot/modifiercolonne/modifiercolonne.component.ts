import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ColonneModule } from 'app/module/colonne.module';
import { ColonneService } from 'app/service/colonne/colonne.service';
import { DepotModule } from 'app/module/depot.module';
import { DepotService } from 'app/service/depot/depot.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-modifiercolonne',
  templateUrl: './modifiercolonne.component.html',
  styleUrls: ['./modifiercolonne.component.scss']
})
export class ModifiercolonneComponent implements OnInit {
  colonneId: number;
  colonne: ColonneModule;
depots:DepotModule[];
  constructor( 
    private router: Router,
    private route: ActivatedRoute,
    private depotService: DepotService,
    private colonneService: ColonneService,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

    ngOnInit(): void {
      this.getdepots();
      this.route.paramMap.subscribe(params => {
        this.colonneId = +params.get('id');
        this.colonneService.getColonne(this.colonneId).subscribe(colonne => {
          this.colonne = colonne;
        });
      });
    }
    onModify() {
      this.colonneService.updateColonne(this.colonne).subscribe(
        (response) => {
          console.log(response);
          // show a success message
          alert('colonne updated successfully!');
          this.router.navigate(['/affichercolonne', this.colonne.id]);
        },
        (error) => {
          console.log(error);
          // show an error message
          alert('Error updating colonne!');
        }
      );
    }
    getdepots(): void{
      this.depotService.getDepots()
      .subscribe(depots=> this.depots = depots)
    }

}
