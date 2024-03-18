import { Component, OnInit } from '@angular/core';
import { FournisseurModule } from 'app/module/fournisseur.module';
import { FournisseurService } from 'app/service/fournisseur/fournisseur.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-ajouterfournisseur',
  templateUrl: './ajouterfournisseur.component.html',
  styleUrls: ['./ajouterfournisseur.component.scss']
})
export class AjouterfournisseurComponent implements OnInit {
  newFournisseur: FournisseurModule={
    id: 0,
    nom: '',
    prenom: '',
    telephone: null,
    email: '',
    adresse: '',
    type: '',
    code: null,
    description: ''
  } 
  constructor(private fournisseurService:FournisseurService,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

  ngOnInit(): void {
  }
  onSubmit() {
    const newFournisseur= new FournisseurModule();
    newFournisseur.nom=this.newFournisseur.nom;
    newFournisseur.prenom=this.newFournisseur.prenom;
    newFournisseur.telephone=this.newFournisseur.telephone
    newFournisseur.email=this.newFournisseur.email;
    newFournisseur.adresse=this.newFournisseur.adresse;
    newFournisseur.type=this.newFournisseur.type;
    newFournisseur.code=this.newFournisseur.code;
    newFournisseur.description=this.newFournisseur.description;

    this.fournisseurService.addFournisseur(newFournisseur).subscribe(
      (response) => {
        console.log(response);
        // clear the form and show a success message
        this.newFournisseur = {
          id: 0,
          nom: '',
          prenom: '',
          telephone: null,
          email: '',
          adresse: '',
          type: '',
          code: null,
          description: ''
        };
        alert('New fournisseur added successfully!');
      },
      (error) => {
        console.log(error);
        // show an error message
        alert('Error adding new fournisseur!');
      }
    );  }

} 
