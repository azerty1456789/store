import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FournisseurModule } from 'app/module/fournisseur.module';
import { FournisseurService } from 'app/service/fournisseur/fournisseur.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-modifierfournisseur',
  templateUrl: './modifierfournisseur.component.html',
  styleUrls: ['./modifierfournisseur.component.scss']
})
export class ModifierfournisseurComponent implements OnInit {
fournisseurId:number;
fournisseur:FournisseurModule;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fournisseurService: FournisseurService,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.fournisseurId = +params.get('id');
      this.fournisseurService.getFournisseur(this.fournisseurId).subscribe(fournisseur => {
        this.fournisseur = fournisseur;
      });
    });
  }
  onSubmit() {
    this.fournisseurService.updateFournisseur(this.fournisseur).subscribe(
      (response) => {
        console.log(response);
        // show a success message
        alert('fournisseur updated successfully!');
        this.router.navigate(['/fournisseur/lister']);
      },
      (error) => {
        console.log(error);
        // show an error message
        alert('Error updating fournisseur!');
      }
    );
  }

}
