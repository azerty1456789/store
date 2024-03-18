import { Component, OnInit } from '@angular/core';
import { DepotModule } from 'app/module/depot.module';
import { DepotService } from 'app/service/depot/depot.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-listerdepot',
  templateUrl: './listerdepot.component.html',
  styleUrls: ['./listerdepot.component.scss']
})
export class ListerdepotComponent implements OnInit {
  depots: DepotModule[] ;
  totaldepots: number;
  pageSize = 5;
  currentPage = 1;
  constructor(private depotService: DepotService ,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

  ngOnInit(): void {
    this.getDepots();
  }
  getDepots():void {
    this.depotService.getDepots()
      .subscribe(depots => {
        this.depots = depots;
        this.totaldepots = depots.length;
      });
  }
   
  paginate(event) {
    this.pageSize = event.target.value;
    this.currentPage = 1;
  }
  pageChanged(event) {
    this.currentPage = event;
  }
}
