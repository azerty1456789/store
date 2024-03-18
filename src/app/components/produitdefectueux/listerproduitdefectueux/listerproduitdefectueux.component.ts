import { Component, OnInit } from '@angular/core';
import { ProduitModule } from 'app/module/produit.module';
import { ProduitService } from 'app/service/produit/produit.service';
import { CategorieModule } from 'app/module/categorie.module';
import { CategorieService } from 'app/service/categorie/categorie.service';
import { ProduitdefectueuxModule } from 'app/module/produitdefectueux.module';
import { ProduitdefectueuxService } from 'app/service/produitdefectueux/produitdefectueux.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-listerproduitdefectueux',
  templateUrl: './listerproduitdefectueux.component.html',
  styleUrls: ['./listerproduitdefectueux.component.scss']
})
export class ListerproduitdefectueuxComponent implements OnInit {
  produitdefectueuxs: ProduitdefectueuxModule[];
  categories: CategorieModule[];
  selectedCategorieId: number=0;
  allProduitdefectueuxs: ProduitdefectueuxModule[];
  searchBarcode: number;
  pageSize = 5;
  currentPage = 1;
  constructor(    private produitService: ProduitService,
    private categorieService: CategorieService,
    private produitdefectueuxService:ProduitdefectueuxService,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }
    ngOnInit(): void {
      this.getProduits();
      this.getCategories();
      
      
  
  
    }
  
  
    getProduits(): void {
      this.produitdefectueuxService.getProduitdefectueuxs().subscribe(produitdefectueuxs => {
        this.allProduitdefectueuxs = produitdefectueuxs;
        this.allProduitdefectueuxs.forEach(produitdefectueux => {
          this.produitService.getProduit(produitdefectueux.idproduit).subscribe((produit: ProduitModule) => {
            produitdefectueux.produit = produit;
          });
        });
        if (this.selectedCategorieId !== 0) { 
          this.produitdefectueuxs = this.allProduitdefectueuxs.filter(p => p.produit.categorieid == this.selectedCategorieId);
        } else {
          this.produitdefectueuxs = this.allProduitdefectueuxs;
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
  this.produitdefectueuxs = this.allProduitdefectueuxs;
      } else {
              this.produitdefectueuxs = this.allProduitdefectueuxs.filter(p => p.produit.categorieid == this.selectedCategorieId);
  
      }
    
    }
    searchByBarcode() {
      this.produitdefectueuxs = this.allProduitdefectueuxs.filter(produitdefectueux => produitdefectueux.produit.codebar == this.searchBarcode);
      this.searchBarcode=undefined
      this.selectedCategorieId=undefined
    }
    
}
