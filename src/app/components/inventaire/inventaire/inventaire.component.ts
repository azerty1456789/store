import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitModule } from 'app/module/produit.module';
import { ProduitService } from 'app/service/produit/produit.service';
import { CategorieModule } from 'app/module/categorie.module';
import { CategorieService } from 'app/service/categorie/categorie.service';
import { RangementModule } from 'app/module/rangement.module';
import { RangementService } from 'app/service/rangement/rangement.service';
import { ColonneModule } from 'app/module/colonne.module';
import { ColonneService } from 'app/service/colonne/colonne.service';
import { DepotModule } from 'app/module/depot.module';
import { DepotService } from 'app/service/depot/depot.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-inventaire',
  templateUrl: './inventaire.component.html',
  styleUrls: ['./inventaire.component.scss']
})
export class InventaireComponent implements OnInit {
  produits: ProduitModule[];
  categories: CategorieModule[];
  selectedCategorieId: number=0;
  allProduits: ProduitModule[];
  searchBarcode: number;
  rangements:RangementModule[];
  colonnes:ColonneModule[];
  depots:DepotModule[];
  pageSize = 5;
  currentPage = 1;

  constructor(
    private produitService: ProduitService,
    private categorieService: CategorieService,
    private RangementService:RangementService,
    private colonneService:ColonneService,
    private depotService:DepotService,
    private route: ActivatedRoute,
    private router: Router,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

  ngOnInit(): void {
    this.getProduits();
    this.getCategories();
    this.getColonnes()
    this.getRangements()
    this.getDepots()

    


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
  
  getRangements(){
return this.RangementService.getRangements().subscribe(rangements=>this.rangements=rangements)
  }
  getColonnes(){
this.colonneService.getColonnes().subscribe(colonnes=>this.colonnes=colonnes)
  }
    getDepots(){
this.depotService.getDepots().subscribe(depots=>this.depots=depots)

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
  getColonnenom(id: number): string {
    let colonne = this.colonnes?.find(c => c.id === id);
    return colonne ? colonne.nom : "";
  }
  getDepotnom(id: number): string {
    let colonne = this.colonnes?.find(c => c.id === id);
    if (!colonne) {
      return "";
    }
    let depot = this.depots?.find(d => d.id === colonne.iddepot);
    return depot ? depot.nom : "";
  }
  updateRangementStock(rangement: RangementModule) {
    if (!rangement.stock  ) {
      alert('Please enter stock');
      return;
    }
    this.RangementService.updateRangement(rangement).subscribe();
  }
  updatePrixvente(produit: ProduitModule){
    if (!produit.prixvente  ) {
      alert('Please enter sell price');
      return;
    }
    this.produitService.updateProduit(produit).subscribe()
  }
}
