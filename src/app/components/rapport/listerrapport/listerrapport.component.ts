import { Component, OnInit } from '@angular/core';
import { ProduitModule } from 'app/module/produit.module';
import { ProduitService } from 'app/service/produit/produit.service';
import { FactureclientModule } from 'app/module/factureclient.module';
import { FactureclientService } from 'app/service/factureclient/factureclient.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-listerrapport',
  templateUrl: './listerrapport.component.html',
  styleUrls: ['./listerrapport.component.scss']
})
export class ListerrapportComponent implements OnInit {

produits: ProduitModule[]
  factureclients: FactureclientModule[];
  fromDate: Date;
  toDate: Date;
  rapport=false
  
  totalSell: number;
  totalRevenue: number;
  mostSoldProducts: ProduitModule[];
  mostProfitableProducts: ProduitModule[];
  unsoldProducts: ProduitModule[];

  constructor(private produitService:ProduitService,
    private factureclientService:FactureclientService,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }
  ngOnInit(): void {
    this.produitService.getProduits().subscribe(produits=>this.produits=produits)
  }

  generateReport() {
    if (!this.fromDate || !this.toDate) {
      alert('Please select date');
      return;
    }
    this.rapport=true
    const fromDate = new Date(this.fromDate);
    const toDate = new Date(this.toDate);
    this.factureclientService.getFacturesByDateRange(fromDate, toDate)
    .subscribe(factureclients => {
   
      this.factureclients = factureclients;
      console.log("factureclients=", this.factureclients);
//  mostSoldProducts
const produitsQuantiteMap = new Map<number, number>();
factureclients.forEach(({ factureligneProduits }) => {
  factureligneProduits.forEach(({ produitId, quantite }) => {
    const currentQuantite = produitsQuantiteMap.get(produitId) ?? 0;
    produitsQuantiteMap.set(produitId, currentQuantite + quantite);
  });
});

this.produitService.getProduits().subscribe((produits: ProduitModule[]) => {
  this.mostSoldProducts = produits
    .map((produit) => {
      const quantitySold = produitsQuantiteMap.get(produit.id) ?? 0;
      return { ...produit, quantitySold };
    })
    .filter((produit) => produit.quantitySold > 0) // Filter out unsold products
    .sort((a, b) => b.quantitySold - a.quantitySold);
});
// mostProfitableProducts
const produitsRevenueMap = new Map<number, number>();
factureclients.forEach(factureclient => {
  factureclient.factureligneProduits.forEach(ligne => {
    const currentRevenue = produitsRevenueMap.get(ligne.produitId) || 0;
    produitsRevenueMap.set(ligne.produitId, currentRevenue + ((ligne.prix * ligne.quantite)-(ligne.prixfournisseur * ligne.quantite)));
  });
});

const sortedProduitsRevenueArray = Array.from(produitsRevenueMap.entries()).sort((a, b) => b[1] - a[1]);
const mostProfitableProduitIds = sortedProduitsRevenueArray.map(entry => entry[0]);

this.produitService.getProduits().subscribe((produits: ProduitModule[]) => {
  this.mostProfitableProducts = produits
    .filter(produit => mostProfitableProduitIds.includes(produit.id))
    .map(produit => {
      const totalRevenue = produitsRevenueMap.get(produit.id) || 0;
      return { ...produit, totalRevenue };
    })
    .sort((a, b) => b.totalRevenue - a.totalRevenue);
});

// unsoldProducts
const produitIds = this.produits.map(produit => produit.id);
const soldProduitIds = Array.from(produitsQuantiteMap.keys());
const productsNotSoldIds = produitIds.filter(id => !soldProduitIds.includes(id));
this.unsoldProducts = this.produits.filter(produit => productsNotSoldIds.includes(produit.id));

   //totalSell and totalRevenue
      let totalSell = 0;
      let totalRevenue = 0;
  
      this.factureclients.forEach(factureclient => {
        factureclient.factureligneProduits.forEach(ligne => {
          totalSell += ligne.quantite * ligne.prix;
          totalRevenue += (ligne.quantite * ligne.prix) - (ligne.quantite * ligne.prixfournisseur);
        });

      });
  
      this.totalSell=totalSell
      this.totalRevenue=totalRevenue
    });
    
  }

}
/*import { Component, OnInit } from '@angular/core';
import { ProduitModule } from 'app/module/produit.module';
import { ProduitService } from 'app/service/produit/produit.service';
import { FactureclientModule } from 'app/module/factureclient.module';
import { FactureclientService } from 'app/service/factureclient/factureclient.service';
import { CoreTranslationService } from '@core/services/translation.service';
import { locale as english } from '../i18n/en';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';

@Component({
  selector: 'app-listerrapport',
  templateUrl: './listerrapport.component.html',
  styleUrls: ['./listerrapport.component.scss']
})
export class ListerrapportComponent implements OnInit {
  produits: ProduitModule[];
  factureclients: FactureclientModule[];
  fromDate: Date;
  toDate: Date;
  rapport = false;
  totalSell: number;
  totalRevenue: number;
  mostSoldProducts: ProduitModule[];
  mostProfitableProducts: ProduitModule[];
  unsoldProducts: ProduitModule[];

  constructor(
    private produitService: ProduitService,
    private factureclientService: FactureclientService,
    private _translateService: CoreTranslationService
  ) {
    this._translateService.translate(english, french, arabic);
  }

  ngOnInit(): void {
    this.produitService.getProduits().subscribe((produits: ProduitModule[]) => {
      this.produits = produits;
    });
  }

  generateReport() {
    if (!this.fromDate || !this.toDate) {
      alert('Please select date');
      return;
    }
    this.rapport = true;
    const fromDate = new Date(this.fromDate);
    const toDate = new Date(this.toDate);
    this.factureclientService
      .getFacturesByDateRange(fromDate, toDate)
      .subscribe((factureclients: FactureclientModule[]) => {
        this.factureclients = factureclients;

        const produitsStatsMap = new Map<number, { quantitySold: number; totalRevenue: number }>();
        let totalSell = 0;
        let totalRevenue = 0;

        for (const factureclient of factureclients) {
          for (const ligne of factureclient.factureligneProduits) {
            const { produitId, quantite, prix, prixfournisseur } = ligne;

            let produitStats = produitsStatsMap.get(produitId);
            if (!produitStats) {
              produitStats = { quantitySold: 0, totalRevenue: 0 };
              produitsStatsMap.set(produitId, produitStats);
            }

            produitStats.quantitySold += quantite;
            produitStats.totalRevenue += (prix - prixfournisseur) * quantite;

            totalSell += prix * quantite;
            totalRevenue += (prix - prixfournisseur) * quantite;
          }
        }

        this.mostSoldProducts = this.produits
          .map((produit) => ({
            ...produit,
            quantitySold: produitsStatsMap.get(produit.id)?.quantitySold || 0
          }))
          .filter((produit) => produit.quantitySold > 0)
          .sort((a, b) => b.quantitySold - a.quantitySold);

        this.mostProfitableProducts = this.produits
          .filter((produit) => produitsStatsMap.has(produit.id))
          .map((produit) => ({
            ...produit,
            totalRevenue: produitsStatsMap.get(produit.id)?.totalRevenue || 0
          }))
          .sort((a, b) => b.totalRevenue - a.totalRevenue);

        const soldProduitIds = Array.from(produitsStatsMap.keys());
        this.unsoldProducts = this.produits.filter((produit) => !soldProduitIds.includes(produit.id));

        this.totalSell = totalSell;
        this.totalRevenue = totalRevenue;
      });
  }
}
*/