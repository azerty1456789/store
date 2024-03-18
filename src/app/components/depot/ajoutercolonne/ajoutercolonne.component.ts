import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { ColonneModule } from 'app/module/colonne.module';
import { ColonneService } from 'app/service/colonne/colonne.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'

@Component({
  selector: 'app-ajoutercolonne',
  templateUrl: './ajoutercolonne.component.html',
  styleUrls: ['./ajoutercolonne.component.scss']
})
export class AjoutercolonneComponent implements OnInit {
  newColonne: ColonneModule = {
    id: null,
    nom: "",
    description: "",
    iddepot: null,
    depot:null
  }
  constructor(
    private colonneService: ColonneService,
    private route: ActivatedRoute,
    private router: Router,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

  ngOnInit(): void {
  }

    onSubmit() {
      const id = this.route.snapshot.paramMap.get('id');//id depot
    const newColonne = new ColonneModule();
    newColonne.nom = this.newColonne.nom;
    newColonne.description = this.newColonne.description;
    newColonne.iddepot = parseInt(id, 10);

    this.colonneService.addColonne(newColonne).subscribe(
      (response) => {
        console.log(response);
        // clear the form and show a success message
        this.newColonne = {
          id: null,
          nom: "",
          description: "",
          iddepot: null,
          depot:null

        };
        alert('New Column added successfully!');
      },
      (error) => {
        console.log(error);
        // show an error message
        alert('Error adding new Column!');
      }
    ); 
    this.router.navigate(['/afficherdepot', this.route.snapshot.paramMap.get('id')]);
 }
}