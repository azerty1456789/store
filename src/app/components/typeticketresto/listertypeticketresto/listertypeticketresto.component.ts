import { Component, OnInit } from '@angular/core';
import { TypeticketrestoModule } from 'app/module/typeticketresto.module';
import { TypeticketrestoService } from 'app/service/typeticketresto/typeticketresto.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-listertypeticketresto',
  templateUrl: './listertypeticketresto.component.html',
  styleUrls: ['./listertypeticketresto.component.scss']
})
export class ListertypeticketrestoComponent implements OnInit {
  typeticketrestos:TypeticketrestoModule[];
  pageSize = 5;
  currentPage = 1;
  constructor(private typeticketrestoService:TypeticketrestoService,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

  ngOnInit(): void {
    this.getTypeticketrestos()
  }
  getTypeticketrestos():void{
    this.typeticketrestoService.getTypeticketrestoes()
    .subscribe(typeticketrestos => this.typeticketrestos = typeticketrestos);
  }
  paginate(event) {
    this.pageSize = event.target.value;
    this.currentPage = 1;
  }
  pageChanged(event) {
    this.currentPage = event;
  }
}
