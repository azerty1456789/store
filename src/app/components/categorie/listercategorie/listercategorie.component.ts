import { Component, OnInit } from '@angular/core';
import { CategorieModule } from 'app/module/categorie.module';
import { CategorieService } from 'app/service/categorie/categorie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-listercategorie',
  templateUrl: './listercategorie.component.html',
  styleUrls: ['./listercategorie.component.scss']
})
export class ListercategorieComponent implements OnInit {
  categories: CategorieModule[];
  pageSize: number = 5;
  currentPage: number = 1;
  parentcategorie: CategorieModule;

  constructor(private categorieService: CategorieService,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

 

  ngOnInit(): void {
    this.categorieService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  
  

  
  
  getParentcategorie(id: number): CategorieModule {
    return this.categories.find(categorie => categorie.id === id);
  }
  
  paginate(event) {
    this.pageSize = event.target.value;
    this.currentPage = 1;
  }
  

}






