import { Component, OnInit } from '@angular/core';
import { ClientModule } from 'app/module/client.module';
import { ClientService } from 'app/service/client/client.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'

@Component({
  selector: 'app-listerclient',
  templateUrl: './listerclient.component.html',
  styleUrls: ['./listerclient.component.scss']
})
export class ListerclientComponent implements OnInit {
    clients: ClientModule[] ;
    pageSize = 5;
    currentPage = 1;
  
    constructor(private clientService: ClientService,
      private _translateService: CoreTranslationService
      ) {
        this._translateService.translate(english, french, arabic);
       }
  
    ngOnInit(): void {
      this.getClients();
    }
  
    getClients(): void {
      this.clientService.getClients()
        .subscribe(clients => {
          this.clients = clients;

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

