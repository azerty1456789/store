import { Component, OnInit } from '@angular/core';
import { CategorieModule } from 'app/module/categorie.module';
import { CategorieService } from 'app/service/categorie/categorie.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-ajoutercategorie',
  templateUrl: './ajoutercategorie.component.html',
  styleUrls: ['./ajoutercategorie.component.scss']
})
export class AjoutercategorieComponent implements OnInit {
  newCategorie: CategorieModule = {
    id: 0,
    titre: '',
    description: '',
    parentid: null,
  };

  // List of all categories to populate the parent select options
  categories: CategorieModule[] = [];

  constructor(private categorieService: CategorieService,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

  ngOnInit(): void {
    // Get list of all categories
    this.categorieService.getCategories().subscribe(
      (response) => {
        this.categories = response;
      },
      (error) => {
        console.log(error);
        // Show an error message
        alert('Error loading categories!');
      }
    );
  }

  onSubmit() {
    const newCategorie = new CategorieModule();
    newCategorie.titre = this.newCategorie.titre;
    newCategorie.description = this.newCategorie.description;
    newCategorie.parentid = this.newCategorie.parentid;

    this.categorieService.addCategorie(newCategorie).subscribe(
      (response) => {
        console.log(response);
        // Clear the form and show a success message
        this.newCategorie = {
          id: null,
          titre: '',
          description: '',
          parentid: null,
        };
        alert('New category added successfully!');
      },
      (error) => {
        console.log(error);
        // Show an error message
        alert('Error adding new category!');
      }
    );
  }

}
