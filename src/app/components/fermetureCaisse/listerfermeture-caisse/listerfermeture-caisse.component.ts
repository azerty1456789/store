import { Component, OnInit } from '@angular/core';
import { FermeturecaisseModule } from 'app/module/fermeturecaisse.module';
import { FermeturecaisseService } from 'app/service/fermeturecaisse/fermeturecaisse.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-listerfermeture-caisse',
  templateUrl: './listerfermeture-caisse.component.html',
  styleUrls: ['./listerfermeture-caisse.component.scss']
})
export class ListerfermetureCaisseComponent implements OnInit {
fermetures:FermeturecaisseModule[];
pageSize = 5;
currentPage = 1;
  constructor(private fermeturecaisseService:FermeturecaisseService,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

  ngOnInit(): void {
    this.getFermetures();
  }
  getFermetures(): void{
this.fermeturecaisseService.getFermeturecaisses().subscribe(fermetures=>{
  this.fermetures=fermetures;
})
  }
  paginate(event) {
    this.pageSize = event.target.value;
    this.currentPage = 1;
  }
  pageChanged(event) {
    this.currentPage = event;
  }

}
