import { Component, OnInit } from '@angular/core';
import { CommandefournisseurModule } from 'app/module/commandefournisseur.module';
import { CommandelignefournisseurModule } from 'app/module/commandelignefournisseur.module';
import { ProduitModule } from 'app/module/produit.module';
import { ProduitService } from 'app/service/produit/produit.service';
import { FournisseurModule } from 'app/module/fournisseur.module';
import { FournisseurService } from 'app/service/fournisseur/fournisseur.service';
import { CommandefournisseurService } from 'app/service/commandefournisseur/commandefournisseur.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-ajoutercommandefournisseur',
  templateUrl: './ajoutercommandefournisseur.component.html',
  styleUrls: ['./ajoutercommandefournisseur.component.scss']
})
export class AjoutercommandefournisseurComponent implements OnInit {
  total=0;
  fournisseurs:FournisseurModule[]=[];
  commandeFournisseur: CommandefournisseurModule = {
    id: 0,
    idfournisseur: 0,
    total: 0,
    commandelignefournisseur: [],
    iduser: 0,
    datecommande: undefined,
    etat: "",
    payee: false
  };

  commandelignefournisseurs: CommandelignefournisseurModule []=[];

  commandelignefournisseur: CommandelignefournisseurModule ={
    CommandefournisseurId: 0,
    produitId: 0,
    quantite: 0,
    produit: new ProduitModule,
    prix: 0
  }
  produit: ProduitModule = new ProduitModule();
  barcode: string;
  constructor(private commandefournisseurService:CommandefournisseurService,
    private produitService:ProduitService,
    private fournisseurService:FournisseurService,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

  ngOnInit(): void {
    this.fournisseurService.getFournisseurs().subscribe(fournisseurs=>this.fournisseurs=fournisseurs);
  }
  onSubmit() {
    const commandeFournisseur= new CommandefournisseurModule();
    commandeFournisseur.idfournisseur=this.commandeFournisseur.idfournisseur;
    commandeFournisseur.datecommande=new Date;
    commandeFournisseur.iduser=this.getCurrentUser()?.unique_name;
    commandeFournisseur.commandelignefournisseur=this.commandelignefournisseurs;
    commandeFournisseur.total=this.total;
    commandeFournisseur.etat="En attente";

  this.commandefournisseurService.addCommandefournisseur(commandeFournisseur).subscribe(
    (response) => {
      console.log(response);
      this.commandeFournisseur={
        id: 0,
        idfournisseur: 0,
        total: 0,
        commandelignefournisseur: [],
        iduser: 0,
        datecommande: undefined,
      etat: '',
      payee: false
    };
        alert('New commande added successfully!');
      },
      (error) => {
        console.log(error);
        // show an error message
        alert('Error adding new commande !');
      }
    );
      };
  
  /*    addCommandeLigneFournisseur() {
        const commandeLigneFournisseur = new CommandelignefournisseurModule();
        commandeLigneFournisseur.quantite=this.commandelignefournisseur.quantite;
        commandeLigneFournisseur.prix=this.commandelignefournisseur.produit.prixFournisseur;
      
        this.produitService.getProductByBarcode(this.barcode).subscribe(
          produit => {
            commandeLigneFournisseur.produit = produit;
            commandeLigneFournisseur.produitId=produit.id;
            commandeLigneFournisseur.prix=produit.prixFournisseur;
      
            this.commandelignefournisseurs.push(commandeLigneFournisseur);
            this.updateTotal(); // call updateTotal() function after adding a product
          },
          error => console.log(error)
        );
      }
*/
      addCommandeLigneFournisseur() {
        const commandeLigneFournisseur = new CommandelignefournisseurModule();
        commandeLigneFournisseur.quantite = this.commandelignefournisseur.quantite;
        commandeLigneFournisseur.prix = this.commandelignefournisseur.produit.prixFournisseur;
      
        const existingLigne = this.commandelignefournisseurs.find(ligne => ligne.produit.codebar.toString() == this.barcode);
        if (existingLigne) {
          existingLigne.quantite += this.commandelignefournisseur.quantite;
          this.updateTotal(); 

        } else {
          this.produitService.getProductByBarcode(this.barcode.toString()).subscribe(
            produit => {
              commandeLigneFournisseur.produit = produit;
              commandeLigneFournisseur.produitId = produit.id;
              commandeLigneFournisseur.prix = produit.prixFournisseur;
      
              this.commandelignefournisseurs.push(commandeLigneFournisseur);
              this.updateTotal(); 

            },
            error => console.log(error)
          );
        }
      }
        
      removeLigne(commandeLigneFournisseur: any) {
        const index = this.commandelignefournisseurs.indexOf(commandeLigneFournisseur);
        if (index > -1) {
          this.total -= commandeLigneFournisseur.quantite * commandeLigneFournisseur.produit.prixFournisseur;
      
          this.commandelignefournisseurs.splice(index, 1);
          this.updateTotal(); // call updateTotal() function after removing a product
        }
      }
      
      updateTotal() {
        this.total= this.commandelignefournisseurs.reduce((acc, commandelignefournisseur) => acc + commandelignefournisseur.quantite*commandelignefournisseur.produit.prixFournisseur, 0);
        console.log("commandeFournisseur:", this.commandeFournisseur); // add console log to check the total
      }
  getCurrentUser(): any {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      return JSON.parse(currentUser);
    }
}


}

