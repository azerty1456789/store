import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ClientModule } from 'app/module/client.module';
import { ClientService } from 'app/service/client/client.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-modifierclient',
  templateUrl: './modifierclient.component.html',
  styleUrls: ['./modifierclient.component.scss']
})
export class ModifierclientComponent implements OnInit {
  clientId: number;
  client: ClientModule;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private _translateService: CoreTranslationService
  ) {this._translateService.translate(english, french, arabic);}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.clientId = +params.get('id');
      this.clientService.getClient(this.clientId).subscribe(client => {
        this.client = client;
      });
    });
  }

  onSubmit() {
    this.clientService.updateClient(this.client).subscribe(
      (response) => {
        console.log(response);
        // show a success message
        alert('Client updated successfully!');
        this.router.navigate(['/client/lister']);
      },
      (error) => {
        console.log(error);
        // show an error message
        alert('Error updating client!');
      }
    );
  }

} 
