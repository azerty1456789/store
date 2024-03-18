import { Component, OnInit } from '@angular/core';
import { ClientModule } from 'app/module/client.module';
import { ClientService } from 'app/service/client/client.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-ajouterclient',
  templateUrl: './ajouterclient.component.html',
  styleUrls: ['./ajouterclient.component.scss']
})
export class AjouterclientComponent implements OnInit {
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
  constructor(private clientService: ClientService,
    private _translateService: CoreTranslationService) { 
    this._translateService.translate(english, french, arabic);
  }

  ngOnInit(): void {
  }
  onSubmit() {
    const newClient = new ClientModule();
    newClient.name = this.newClient.name;
    newClient.lastname = this.newClient.lastname;
    newClient.priority = this.newClient.priority;
    newClient.gender = this.newClient.gender;
    newClient.phone = this.newClient.phone;
    newClient.email = this.newClient.email;
    newClient.adresse = this.newClient.adresse;
    newClient.photo = this.newClient.photo;
    newClient.credit = this.newClient.credit;
  
    this.clientService.addClient(newClient).subscribe(
      (response) => {
        console.log(response);
        // clear the form and show a success message
        this.newClient = {
          id: 0,
          name: '',
          lastname: '',
          priority: '',
          gender: '',
          phone: 0 ,
          email: '',
          adresse: '',
          photo: '',
          credit: 0
        };
        alert('New client added successfully!');
      },
      (error) => {
        console.log(error);
        // show an error message
        alert('Error adding new client!');
      }
    );  }

} 
