import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ProduitModule } from 'app/module/produit.module';
import { ProduitService } from 'app/service/produit/produit.service';
import { CategorieModule } from 'app/module/categorie.module';
import { CategorieService } from 'app/service/categorie/categorie.service';
import { PhotoproduitService } from 'app/service/photoproduit/photoproduit.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-modifierproduit',
  templateUrl: './modifierproduit.component.html',
  styleUrls: ['./modifierproduit.component.scss']
})
export class ModifierproduitComponent implements OnInit {
  produitId: number;
  produit: ProduitModule;
  categories: CategorieModule[];
  selectedFiles: File[];
parent:ProduitModule
  constructor( private route: ActivatedRoute,
    private router: Router,
    private produitService: ProduitService,
    private categorieService: CategorieService,
    private photoproduitService:PhotoproduitService,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

    ngOnInit(): void {
      this.getCategories();

      this.route.paramMap.subscribe(params => {
        this.produitId = +params.get('id');
        this.produitService.getProduit(this.produitId).subscribe(produit => {
          this.produit = produit;
          console.log(produit);
        });
      });
    }


    removeImage(id) {
      this.photoproduitService.deletePhotoproduit(id).subscribe(() => {
        // Find the index of the photo in the photoproduits array
        const index = this.produit.photoproduits.findIndex(photo => photo.id === id);
        // Remove the photo from the array
        this.produit.photoproduits.splice(index, 1);
      });
    }
    
    
    
    
    
    
  
  getCategories(): void {
    this.categorieService.getCategories().subscribe(
      categories => {
        this.categories = categories;
      },
      error => {
        console.log('Error retrieving categories', error);
      }
    );
  }
  onProduitParentChange() {
    if (!this.produit.produitparent){
      this.parent=null

    }
    else{
    this.produitService.getProductByBarcode(this.produit.produitparent.toString()).subscribe(
      (produit) => {
       
        this.parent = produit;
      },
      (error) => {
        this.parent=null
        console.log(error);
      }
    );
  }
}
    onSubmit() {

      this.produitService.updateProduit(this.produit).subscribe(
        (response) => {
          console.log(response);
          if (this.selectedFiles){this.photoproduitService.uploadPhoto(this.produit.id, this.selectedFiles ).subscribe(
            (photos) => {
              console.log('Uploaded photos:', photos);
            },
            (error) => {
              console.error('Failed to upload photos:', error);
            }
            );}
          
          // show a success message
          alert('Produit updated successfully!');
          this.router.navigate(['/produit/lister']);
        },
        (error) => {
          console.log(error);
          // show an error message
          alert('Error updating Produit!');
        }
      );
    }
  
    onFileSelect(event) {
      if (event.target.files.length > 0) {
        this.selectedFiles = event.target.files;
        
      }
    }

}





  


  

