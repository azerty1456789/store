import { Component, OnInit } from '@angular/core';
import { DepotModule } from 'app/module/depot.module';
import { DepotService } from 'app/service/depot/depot.service';
import {  Router } from '@angular/router';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'

@Component({
  selector: 'app-ajouterdepot',
  templateUrl: './ajouterdepot.component.html',
  styleUrls: ['./ajouterdepot.component.scss']
})
export class AjouterdepotComponent implements OnInit {
  newDepot: DepotModule = {
    id: null,
    nom: "",
    adresse: "",
    type: "stockage",
    description: "",
  };
  constructor(private depotService:DepotService,
    private router: Router,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

    ngOnInit(): void {
      this.depotService.getDepots().subscribe(depots => {
        
    
        let type = false;
    
        for (const element of depots) {
          if (element.type === "vente") {
            type = true;
            break;
          }
        }
    
        const selectElement = document.getElementById("type") as HTMLSelectElement;
        selectElement.disabled = type;
      });
    }
  onSubmit() {
    const newDepot = new DepotModule();
    newDepot.nom = this.newDepot.nom;
    newDepot.adresse = this.newDepot.adresse;
    newDepot.type = this.newDepot.type;
    newDepot.description = this.newDepot.description;

    this.depotService.addDepot(newDepot).subscribe(
      (response) => {
        console.log(response);
        // clear the form and show a success message
        this.newDepot = {
          id: null,
          nom: "",
          adresse: "",
          type: "vente",
          description: "",
        };
        alert('New depot added successfully!');
      },
      (error) => {
        console.log(error);
        // show an error message
        alert('Error adding new depot!');
      }
      
    ); this.router.navigate(['/depot/lister']); }
}


