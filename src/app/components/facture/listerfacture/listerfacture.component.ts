import { Component, OnInit } from '@angular/core';
import { FactureclientModule } from 'app/module/factureclient.module';
import { FactureclientService } from 'app/service/factureclient/factureclient.service';
import { ClientService } from 'app/service/client/client.service';
import { ClientModule } from 'app/module/client.module';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-listerfacture',
  templateUrl: './listerfacture.component.html',
  styleUrls: ['./listerfacture.component.scss']
})
export class ListerfactureComponent implements OnInit {
  factureclients: FactureclientModule[] ;
  pageSize = 5;
  currentPage = 1;
  clients: ClientModule[];
  constructor(
    private factureclientService:FactureclientService,
     private clientService:ClientService ,
     private _translateService: CoreTranslationService) {
       this._translateService.translate(english, french, arabic);
 
      }

  ngOnInit(): void {
    this.getFactureclients();
    this.getClients();

  }
  getFactureclients(): void {
    this.factureclientService.getFactureclients()
      .subscribe(factureclients => {
        this.factureclients = factureclients;


      });
  }

  getClients(): void {
    this.clientService.getClients()
      .subscribe(clients => this.clients = clients);
  }

  getClientName(id: number): string {
    if (this.clients) {
   
    const client = this.clients.find(c => c.id === id);
    return client ? client.name : ''; }
}

  paginate(event) {
    this.pageSize = event.target.value;
    this.currentPage = 1;
  }
  pageChanged(event) {
    this.currentPage = event;
  }
}
