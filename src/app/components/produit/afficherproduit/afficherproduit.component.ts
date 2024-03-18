import { Component,  OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitModule } from 'app/module/produit.module';
import { ProduitService } from 'app/service/produit/produit.service';
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
  selector: 'app-afficherproduit',
  templateUrl: './afficherproduit.component.html',
  styleUrls: ['./afficherproduit.component.scss']
})
export class AfficherproduitComponent implements OnInit {
  produit: ProduitModule;
produitparent:ProduitModule;
rangements:RangementModule[];
colonnes:ColonneModule[];
depots:DepotModule[];
currentImageIndex = 0;
selectedImageIndex= 0;

  constructor(
    private produitService: ProduitService,
    private RangementService:RangementService,
    private colonneService:ColonneService,
    private depotService:DepotService,
    private route: ActivatedRoute,
    private router: Router,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

      ngOnInit(): void {
        const id = +this.route.snapshot.paramMap.get('id');
   this.colonneService.getColonnes().subscribe(colonnes => this.colonnes = colonnes)
  this.depotService.getDepots().subscribe(depots =>this.depots = depots);
      
        this.produitService.getProduit(id).subscribe(produit => {
          this.produit = produit;
          console.log(produit);
          if (produit) {
            this.RangementService.getRangementsByProduitId(produit.id).subscribe(rangements=>this.rangements=rangements);
          }
          if(produit.produitparent){
          this.produitService.getProduit(this.produit.produitparent).subscribe(produit=>this.produitparent=produit)

          }
        });
        

      }

  onModify(): void {
    this.router.navigate(['/modifierproduit', this.produit.id]);
  }

  onDelete(): void {
    this.produitService.deleteProduit(this.produit.id)
    
      .subscribe(() => {
        alert(' produit deleted!');
        this.router.navigate(['/produit/lister']);
      });
  }
  getColonnenom(id: number): string {
    let colonne = this.colonnes.find(c => c.id === id);
    return colonne ? colonne.nom : "";
  }
  getDepotnom(id: number): string {
    let colonne = this.colonnes.find(c => c.id === id);
    if (!colonne) {
      return "";
    }
    let depot = this.depots.find(d => d.id === colonne.iddepot);
    return depot ? depot.nom : "";
  }


  printbarcode() {
    let barcodeHtml = '<table>';
    for (let i = 0; i < 45; i++) { // change 63 to the number of copies you want
      if (i % 5 == 0) {
        barcodeHtml += '<tr>'; // start new row after every 7th barcode
      }
      barcodeHtml += '<td style="padding:10px;border:1px solid #ccc;text-align:center;">';
      barcodeHtml += document.getElementById("barcode").innerHTML;
      barcodeHtml += '<div style="font-size:12px;margin-top:5px;">' + this.produit.nom + '</div>';
      barcodeHtml += '<div style="font-size:12px;margin-top:5px;">' + this.produit.codebar + '</div>';
      barcodeHtml += '</td>';
    }
    barcodeHtml += '</table>';
  
    // Open a new window with the contents to be printed
    let printWindow = window.open('', 'PrintWindow', 'height=600,width=800');
  
    // Write the contents to the new window
    printWindow.document.write('<html><head><title>Barcode </title></head><body>' + barcodeHtml + '</body></html>');
  
    // Call the print() function on the new window
    printWindow.print();
  }

  printqrcode() {
    let qrcodeHtml = '<table>';
    for (let i = 0; i < 49; i++) { // change 63 to the number of copies you want
      if (i % 7 == 0) {
        qrcodeHtml += '<tr>'; // start new row after every 7th barcode
      }
      qrcodeHtml += '<td style="padding:10px;border:1px solid #ccc;text-align:center;">';
      qrcodeHtml += document.getElementById("qrcode").innerHTML;
      qrcodeHtml += '<div style="font-size:12px;margin-top:5px;">' + this.produit.nom + '</div>';
      qrcodeHtml += '<div style="font-size:12px;margin-top:5px;">' + this.produit.codebar + '</div>';
      qrcodeHtml += '</td>';
    }
    qrcodeHtml += '</table>';
  
    // Open a new window with the contents to be printed
    let printWindow = window.open('', 'PrintWindow', 'height=600,width=800');
  
    // Write the contents to the new window
    printWindow.document.write('<html><head><title>Barcode </title></head><body>' + qrcodeHtml + '</body></html>');
  
    // Call the print() function on the new window
    printWindow.print();
  }
  
}



  




