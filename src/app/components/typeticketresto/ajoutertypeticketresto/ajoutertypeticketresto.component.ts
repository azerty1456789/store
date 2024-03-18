import { Component, OnInit } from '@angular/core';
import { TypeticketrestoModule } from 'app/module/typeticketresto.module';
import { TypeticketrestoService } from 'app/service/typeticketresto/typeticketresto.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-ajoutertypeticketresto',
  templateUrl: './ajoutertypeticketresto.component.html',
  styleUrls: ['./ajoutertypeticketresto.component.scss']
})
export class AjoutertypeticketrestoComponent implements OnInit {
  newTypeTicketResto:TypeticketrestoModule={
    id:0,
    nom:"",
    montant:null,
    pourcentage:null,
  }
  constructor(private typeticketrestoService:TypeticketrestoService,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

  ngOnInit(): void {
  }
onSubmit(){
  const newTypeTicketResto= new TypeticketrestoModule();
  newTypeTicketResto.nom=this.newTypeTicketResto.nom;
  newTypeTicketResto.montant=this.newTypeTicketResto.montant;
  newTypeTicketResto.pourcentage=100-this.newTypeTicketResto.pourcentage;
  this.typeticketrestoService.addTypeticketresto(newTypeTicketResto).subscribe(
    (response) => {
      console.log(response);
      this.newTypeTicketResto={
        id:0,
        nom:"",
        montant:null,
        pourcentage:null,
      }
      alert('New Type Ticket Resto added successfully!');
      },
      (error) => {
        console.log(error);
        // show an error message
        alert('Error adding new Type Ticket Resto!');
      }
  )
}
}
