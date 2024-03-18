import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ColonneModule } from 'app/module/colonne.module';
import { ColonneService } from 'app/service/colonne/colonne.service';
import { RangementModule } from 'app/module/rangement.module';
import { RangementService } from 'app/service/rangement/rangement.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'

@Component({
  selector: 'app-modifierrangement',
  templateUrl: './modifierrangement.component.html',
  styleUrls: ['./modifierrangement.component.scss']
})
export class ModifierrangementComponent implements OnInit {
  rangementId: number;
  rangement: RangementModule;
colonnes:ColonneModule[];
  constructor( 
    private router: Router,
    private route: ActivatedRoute,
    private rangementService: RangementService,
    private colonneService: ColonneService,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

    ngOnInit(): void {
      this.getcolonnes();
      this.route.paramMap.subscribe(params => {
        this.rangementId = +params.get('id');
        this.rangementService.getRangement(this.rangementId).subscribe(rangement => {
          this.rangement = rangement;
        });
      });
    }
    onModify() {
      this.rangementService.updateRangement(this.rangement).subscribe(
        (response) => {
          console.log(response);
          // show a success message
          alert('rangement updated successfully!');
          this.router.navigate(['/afficherrangement', this.rangement.id]);

        },
        (error) => {
          console.log(error);
          // show an error message
          alert('Error updating rangement!');
        }
      );
    }
    getcolonnes(): void{
      this.colonneService.getColonnes()
      .subscribe(colonnes=> this.colonnes = colonnes)
    }

}
