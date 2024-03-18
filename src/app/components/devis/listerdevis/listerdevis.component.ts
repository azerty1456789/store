import { Component, OnInit } from '@angular/core';
import { DevisModule } from 'app/module/devis.module';
import { DevisService } from 'app/service/devis/devis.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-listerdevis',
  templateUrl: './listerdevis.component.html',
  styleUrls: ['./listerdevis.component.scss']
})
export class ListerdevisComponent implements OnInit {
  pageSize = 5;
    currentPage = 1;
devis:DevisModule[]
  constructor(private devisService:DevisService,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

  ngOnInit(): void {
    this.getDevis()
  }
  getDevis(){
    this.devisService.getDeviss()
    .subscribe(devis=>this.devis=devis)
  }
  paginate(event) {
    this.pageSize = event.target.value;
    this.currentPage = 1;
  }
  pageChanged(event) {
    this.currentPage = event;
  }
}
