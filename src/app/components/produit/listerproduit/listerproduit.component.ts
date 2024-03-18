import { Component, OnInit } from '@angular/core';
import { ProduitModule } from 'app/module/produit.module';
import { ProduitService } from 'app/service/produit/produit.service';
import { CategorieModule } from 'app/module/categorie.module';
import { CategorieService } from 'app/service/categorie/categorie.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-listerproduit',
  templateUrl: './listerproduit.component.html',
  styleUrls: ['./listerproduit.component.scss']
})
export class ListerproduitComponent implements OnInit {
  produits: ProduitModule[];
  categories: CategorieModule[];
  selectedCategorieId: number=0;
  allProduits: ProduitModule[];
  searchBarcode: number;

  pageSize = 5;
  currentPage = 1;
  
  constructor(
    private produitService: ProduitService,
    private categorieService: CategorieService,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }
  ngOnInit(): void {
    this.getProduits();
    this.getCategories();
    
    


  }


  getProduits(): void {
    this.produitService.getProduits().subscribe(produits => {
      this.allProduits = produits;
      if (this.selectedCategorieId !== 0) { 
        this.produits = this.allProduits.filter(p => p.categorieid == this.selectedCategorieId);
      } else {
        this.produits = this.allProduits;
      }
     
    });
  }

  getCategories(): void {
    this.categorieService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }


  getCategorie(id: number): CategorieModule {
    return this.categories ? this.categories.find(categorie => categorie.id == id) : null;
  }
  

  paginate(event) {
    this.pageSize = event.target.value;
    this.currentPage = 1;
  }

  pageChanged(event) {
    this.currentPage = event;
  }
  filterByCategorie() {

    if (this.selectedCategorieId == 0) {
this.produits = this.allProduits;
    } else {
            this.produits = this.allProduits.filter(p => p.categorieid == this.selectedCategorieId);

    }
  
  }
  searchByBarcode() {
    this.produits = this.allProduits.filter(produit => produit.codebar == this.searchBarcode);
    this.searchBarcode=undefined
    this.selectedCategorieId=undefined
  }
  
}

    

  
    
  

