import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieModule } from 'app/module/categorie.module';
import { CategorieService } from 'app/service/categorie/categorie.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-modifiercategorie',
  templateUrl: './modifiercategorie.component.html',
  styleUrls: ['./modifiercategorie.component.scss']
})
export class ModifiercategorieComponent implements OnInit {
  categorieId: number;
  categorie: CategorieModule;
  categories: CategorieModule[] = [];
  parentcategorie: CategorieModule;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private categorieService: CategorieService,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categorieId = +params.get('id');
      this.categorieService.getCategorie(this.categorieId).subscribe(categorie => {
        this.categorie = categorie;
        this.parentcategorie = this.categories.find(c => c.id === this.categorie.parentid);
      });
    });
    this.categorieService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onParentCategorySelected() {
    this.parentcategorie = this.categories.find(c => c.id === this.categorie.parentid);
  }

  onSubmit() {
    this.categorieService.updateCategorie(this.categorie).subscribe(
      (response) => {
        console.log(response);
        // show a success message
        alert('Categorie updated successfully!');
        this.router.navigate(['/categorie/lister']);
      },
      (error) => {
        console.log(error);
        // show an error message
        alert('Error updating categorie!');
      }
    );
  }
}