import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientModule } from 'app/module/client.module';
import { ClientService } from 'app/service/client/client.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from 'app/components/client/i18n/en'
import { locale as french } from 'app/components/client/i18n/fr'
import { locale as arabic } from 'app/components/client/i18n/ar'
@Component({
  selector: 'app-quickaddclient',
  templateUrl: './quickaddclient.component.html',
  styleUrls: ['./quickaddclient.component.scss']
})
export class QuickaddclientComponent implements OnInit {
  newClient: ClientModule = {
    id: null,
  name: '',
  lastname: '',
  priority: '',
  gender: '',
  phone: null,
  email: '',
  adresse: '',
  photo: '',
  credit: 0
  };
  constructor(public activeModal: NgbActiveModal,private clientService: ClientService,
    private _translateService: CoreTranslationService) { 
    this._translateService.translate(english, french, arabic);
  }

  ngOnInit(): void {
  }
  submit() {
    // Handle form submission
    const newClient = new ClientModule();
    newClient.name = this.newClient.name;
    newClient.lastname = this.newClient.lastname;
    newClient.phone = this.newClient.phone;
    newClient.credit=0
    this.clientService.addClient(newClient).subscribe(
      (response) => {
        console.log(response);
       
        alert('New client added successfully!');
      },
      (error) => {
        console.log(error);
        alert('Error adding new client!');
      }
    ); 
    // Close the modal
    this.activeModal.close();
  }
}
