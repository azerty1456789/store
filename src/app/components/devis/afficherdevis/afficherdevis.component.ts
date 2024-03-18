import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DevisModule } from 'app/module/devis.module';
import { DevisService } from 'app/service/devis/devis.service';
import { ProduitModule } from 'app/module/produit.module';
import { ProduitService } from 'app/service/produit/produit.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-afficherdevis',
  templateUrl: './afficherdevis.component.html',
  styleUrls: ['./afficherdevis.component.scss']
})
export class AfficherdevisComponent implements OnInit {
devis:DevisModule
  constructor(private devisService:DevisService,
    private produitService:ProduitService,
    private route: ActivatedRoute,
    private router: Router  ,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.devisService.getDevis(id).subscribe((data: DevisModule) => {
      this.devis = data;
      console.log(data)
      
      // fetch the corresponding produit for each factureligneProduit
      this.devis?.devisligneproduit.forEach(ligne => {
        this.produitService.getProduit(ligne.produitId).subscribe((produit: ProduitModule) => {
          ligne.produit = produit;
        });
  
      });
  
 
    
    });
  }
  onDelete(): void {
    this.devisService.deleteDevis(this.devis.id)
    
      .subscribe(() => {
        alert('commande fournisseur deleted!');
        this.router.navigate(['/devis/lister']);
      });
  }
  onValidate():void{
    this.router.navigate(['/caisse'], { queryParams: { devis: JSON.stringify(this.devis) } });

  }
}
