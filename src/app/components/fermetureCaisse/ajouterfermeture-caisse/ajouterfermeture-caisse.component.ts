import { Component, OnInit } from '@angular/core';
import { FermeturecaisseModule } from 'app/module/fermeturecaisse.module';
import { FermeturecaisseService } from 'app/service/fermeturecaisse/fermeturecaisse.service';
import { FactureclientService } from 'app/service/factureclient/factureclient.service';
import { FactureclientModule } from 'app/module/factureclient.module';
import { Router } from '@angular/router';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'

@Component({
  selector: 'app-ajouterfermeture-caisse',
  templateUrl: './ajouterfermeture-caisse.component.html',
  styleUrls: ['./ajouterfermeture-caisse.component.scss']
})
export class AjouterfermetureCaisseComponent implements OnInit {
  factureNumber:number;
  dernierefactureidinlastfermeturecaisse:number;
  factureWithMinDate:FactureclientModule
  newFermeturecaisse: FermeturecaisseModule= {
    id: null,
    montantdebut: null,
    idemployee: null,
    dernierefactureid: 1,
    totalcash: null,
    totalcheck: null,
    totalticketresto: null,
    ecartcash: null,
  ecartcheck: null,
  ecartticketresto: null,
    datefermeture: new Date(),
    dateouverture:null
  };

  constructor(private fermeturecaisseService:FermeturecaisseService,
    private factureclientService:FactureclientService,
    private router: Router,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

 
    ngOnInit(): void {

    /*  this.factureclientService.getFactureclients().subscribe(factures => {
        const filteredFactures = factures.filter(facture => facture.iduser == this.getCurrentUser()?.unique_name);
        const factureNumber = filteredFactures.reduce((max, facture) => facture.id > max ? facture.id : max, 0);
        this.factureNumber = factureNumber;
    
        this.fermeturecaisseService.getFermeturecaisses().subscribe(fermetures => {
          const filteredFermetures = fermetures.filter(fermeture => fermeture.idemployee == this.getCurrentUser()?.unique_name);
          this.dernierefactureidinlastfermeturecaisse = filteredFermetures.reduce((max, fermeture) => fermeture.dernierefactureid > max ? fermeture.dernierefactureid : max, 0);
          this.factureWithMinDate = filteredFactures.filter(facture => facture.id > this.dernierefactureidinlastfermeturecaisse)
          .reduce((min, facture) => facture.datefacture < min.datefacture ? facture : min);
          console.log("dernierefactureid", this.dernierefactureidinlastfermeturecaisse);
          console.log("filteredFactures", filteredFactures);
          console.log("filteredFermetures", filteredFermetures);
          console.log("factureWithMinDate", this.factureWithMinDate);

        });
      });*/
      
      this.fermeturecaisseService.getlastFermeturecaisseByUser(this.getCurrentUser()?.unique_name).subscribe(lastFermeture => {
        const dernierefactureidinlastfermeturecaisse = lastFermeture?.dernierefactureid || 0;
        this.factureclientService.getLastFacturesByUser(this.getCurrentUser()?.unique_name, dernierefactureidinlastfermeturecaisse).subscribe(factures => {
          const factureNumber = factures.reduce((max, facture) => facture.id > max ? facture.id : max, 0);
          this.factureNumber = factureNumber;
      
          this.dernierefactureidinlastfermeturecaisse = dernierefactureidinlastfermeturecaisse;
          
          this.factureWithMinDate = factures.filter(facture => facture.id > this.dernierefactureidinlastfermeturecaisse)
          
            .reduce((min, facture) => facture.datefacture < min.datefacture ? facture : min);
            
          console.log("dernierefactureid", this.dernierefactureidinlastfermeturecaisse);
          console.log("factures", factures);
          console.log("factureWithMinDate", this.factureWithMinDate);
        });
      }, error => {
        console.log("Error getting last fermeture:", error);
        this.factureclientService.getLastFacturesByUser(this.getCurrentUser()?.unique_name, 0).subscribe(factures => {
          const factureNumber = factures.reduce((max, facture) => facture.id > max ? facture.id : max, 0);
          this.factureNumber = factureNumber;
      
          this.dernierefactureidinlastfermeturecaisse = 0;
          this.factureWithMinDate = factures.reduce((min, facture) => facture.datefacture < min.datefacture ? facture : min);
          console.log("factures", factures);
          console.log("factureWithMinDate", this.factureWithMinDate);
        }, error => {
          console.log("Error getting factures:", error);
        });
      });
      
    }


  onSubmit() {
    if (!this.factureWithMinDate){
      alert("No new sell for you to add closing.");
    return;
    }
 if (!this.newFermeturecaisse.montantdebut || !this.newFermeturecaisse.totalcash ||!this.newFermeturecaisse.totalcheck ||!this.newFermeturecaisse.totalticketresto ) {
      alert('Please enter all information');
      return;
    }
    const newFermeturecaisse = new FermeturecaisseModule();
    newFermeturecaisse.montantdebut = this.newFermeturecaisse.montantdebut;
    newFermeturecaisse.idemployee = this.getCurrentUser()?.unique_name
    newFermeturecaisse.dernierefactureid = this.factureNumber;
    newFermeturecaisse.totalcash = this.newFermeturecaisse.totalcash;
    newFermeturecaisse.totalcheck = this.newFermeturecaisse.totalcheck;
    newFermeturecaisse.totalticketresto = this.newFermeturecaisse.totalticketresto;
    newFermeturecaisse.datefermeture = this.newFermeturecaisse.datefermeture;
    newFermeturecaisse.dateouverture = this.factureWithMinDate.datefacture;
    this.factureclientService.getFactureclients().subscribe(factures => {console.log("factures",factures)
      // Filter factures with iduser equal to fermeturecaisse.idemployee and id > dernierefactureid
      const filteredFactures = factures.filter(facture => 
        facture.iduser == newFermeturecaisse.idemployee 
        && facture.id > this.dernierefactureidinlastfermeturecaisse
      );
      
// Calculate cash check and ticketresto from filtered factures
const { totalcash, totalcheck, totalticketresto } = filteredFactures.reduce((acc, facture) => {
  if (facture.modepayment === 'cash') {
    acc.totalcash += facture.total;
   
  } else if (facture.modepayment === 'check') {
    acc.totalcheck += facture.total;
  } else if (facture.modepayment === 'ticket') {
    acc.totalticketresto += facture.totalticketresto;
    acc.totalcash += facture.total - facture.totalticketresto;
  }
  return acc;
}, { totalcash: 0, totalcheck: 0, totalticketresto: 0 });

  
      // Calculate ecartcash and ecartcheck
      newFermeturecaisse.ecartcash = totalcash - (this.newFermeturecaisse.totalcash - this.newFermeturecaisse.montantdebut);
      newFermeturecaisse.ecartcheck = totalcheck - this.newFermeturecaisse.totalcheck;
      newFermeturecaisse.ecartticketresto = totalticketresto - this.newFermeturecaisse.totalticketresto;
      // Add newFermeturecaisse to the database
      this.fermeturecaisseService.addFermeturecaisse(newFermeturecaisse).subscribe(
        (response) => {
          console.log(response);
        
          alert('New Fermeture caisse added successfully!');
          this.router.navigate(['/fermeturecaisse/lister']);
        },
        (error) => {
          console.log(error);
          // show an error message
          alert('Error adding new Fermeture caisse!');
        }
      );
    });
  }
    getCurrentUser(): any {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        return JSON.parse(currentUser);
      }
}

}
