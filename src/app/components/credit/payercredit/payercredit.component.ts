import { Component, OnInit } from '@angular/core';

import { ClientModule } from 'app/module/client.module';
import { ClientService } from 'app/service/client/client.service';
import { FactureclientService } from 'app/service/factureclient/factureclient.service';
import { FactureclientModule } from 'app/module/factureclient.module';

import { map } from 'rxjs/operators';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-payercredit',
  templateUrl: './payercredit.component.html',
  styleUrls: ['./payercredit.component.scss']
})
export class PayercreditComponent implements OnInit {
  clients: ClientModule[];
  selectedClient: number;
  clientCredit: number;
  creditPayment: number;
  latestFactures: FactureclientModule[];
  constructor(private clientService: ClientService,private factureclientService: FactureclientService,
    private _translateService: CoreTranslationService) {
    this._translateService.translate(english, french, arabic);

   }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(clients => this.clients = clients);

  }




  getClientCredit() {
    console.log(this.selectedClient)
    forkJoin({
      client: this.clientService.getClient(this.selectedClient),
      
      factures: this.factureclientService.getFacturesByClientId(this.selectedClient)
        .pipe(
          map(factures => factures.filter(facture => facture.montantpaye <= facture.total)),
          map(factures => factures.sort((a, b) => new Date(b.datefacture).getTime() - new Date(a.datefacture).getTime()))
        )
    }).subscribe(result => {
      console.log(result)
      this.clientCredit = result.client.credit;
  
      let total = 0;
      const latestFactures: FactureclientModule[] = [];
      let i = 0;
    
      while (total < this.clientCredit && i < result.factures.length) {
        const facture = result.factures[i];
        if (facture.modepayment === 'credit') {
          latestFactures.push(facture);
          total += facture.total;
        }
        i++;
      }
  console.log (latestFactures)
      this.latestFactures = latestFactures;
    });
  }

  saveCreditPayment(): void {
    // create new facture
    const facture = new FactureclientModule();
    facture.idclient = this.selectedClient;
    facture.total = this.creditPayment;
    facture.modepayment = 'cash';
    facture.iduser=this.getCurrentUser()?.unique_name;
  
    // save facture and update client credit
    forkJoin({
      facture: this.factureclientService.addFactureclient(facture),
      creditUpdate: this.clientService.updateCredit(this.selectedClient, -this.creditPayment),
    }).subscribe(
      () => {
        // reset creditPayment value after successful update
        this.creditPayment = 0;
        location.reload();
      },
      (error) => {
        console.error(error);
        // handle error case
      }
    );
  }
  
  getCurrentUser(): any {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      return JSON.parse(currentUser);
    }
}

}
