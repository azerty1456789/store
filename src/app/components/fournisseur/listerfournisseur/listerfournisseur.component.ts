import { Component, OnInit } from '@angular/core';
import { FournisseurModule } from 'app/module/fournisseur.module';
import { FournisseurService } from 'app/service/fournisseur/fournisseur.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-listerfournisseur',
  templateUrl: './listerfournisseur.component.html',
  styleUrls: ['./listerfournisseur.component.scss']
})
export class ListerfournisseurComponent implements OnInit {
  fournisseurs: FournisseurModule[] ;
  pageSize = 5;
  currentPage = 1;
  constructor(private fournisseurService:FournisseurService,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

  ngOnInit(): void {
    this.getFournisseurs();

  }
  getFournisseurs(): void {
this.fournisseurService.getFournisseurs().subscribe(fournisseurs=>this.fournisseurs=fournisseurs)
  }
  
  
  paginate(event) {
    this.pageSize = event.target.value;
    this.currentPage = 1;
  }
  pageChanged(event) {
    this.currentPage = event;
  }
}
