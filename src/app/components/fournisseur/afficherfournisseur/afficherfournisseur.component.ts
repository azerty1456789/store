import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FournisseurModule } from 'app/module/fournisseur.module';
import { FournisseurService } from 'app/service/fournisseur/fournisseur.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-afficherfournisseur',
  templateUrl: './afficherfournisseur.component.html',
  styleUrls: ['./afficherfournisseur.component.scss']
})
export class AfficherfournisseurComponent implements OnInit {
fournisseur: FournisseurModule
  constructor(
    private fournisseurService:FournisseurService,
    private route: ActivatedRoute,
    private router: Router,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.fournisseurService.getFournisseur(id)
      .subscribe(fournisseur => this.fournisseur = fournisseur);
  }
  onModify(): void {
    this.router.navigate(['/modifierfournisseur', this.fournisseur.id]);
  }

  onDelete(): void {
    this.fournisseurService.deleteFournisseur(this.fournisseur.id)
    
      .subscribe(() => {
        alert(' fournisseur deleted!');
        this.router.navigate(['/fournisseur/lister']);
      });
  }
}
