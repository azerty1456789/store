import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandefournisseurModule } from 'app/module/commandefournisseur.module';
import { CommandefournisseurService } from 'app/service/commandefournisseur/commandefournisseur.service';
import { ProduitModule } from 'app/module/produit.module';
import { ProduitService } from 'app/service/produit/produit.service';
import { FournisseurModule } from 'app/module/fournisseur.module';
import { FournisseurService } from 'app/service/fournisseur/fournisseur.service';
import { CommandelignefournisseurModule } from 'app/module/commandelignefournisseur.module';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-modifiercommandefournisseur',
  templateUrl: './modifiercommandefournisseur.component.html',
  styleUrls: ['./modifiercommandefournisseur.component.scss']
})
export class ModifiercommandefournisseurComponent implements OnInit {
commandeId:number;
//fournisseurs:FournisseurModule[]=[];
fournisseur:FournisseurModule
total=0;
commandeLigneFournisseurs: CommandelignefournisseurModule []=[];
commandeLigneFournisseur: CommandelignefournisseurModule ={
  CommandefournisseurId: 0,
  produitId: 0,
  quantite: 0,
  produit: new ProduitModule,
  prix: 0
}
etats = ['En attente', 'Validée', 'En cours de traitement', 'Expédiée', 'Livrée', 'Annulée'];
produit: ProduitModule = new ProduitModule();
barcode: string;

commandeFournisseur:CommandefournisseurModule
  etat: string;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private produitService:ProduitService,
    private commandefournisseurService:CommandefournisseurService,
    private fournisseurService:FournisseurService,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

    ngOnInit(): void {
     // this.fournisseurService.getFournisseurs().subscribe(fournisseurs=>this.fournisseurs=fournisseurs);
      this.route.paramMap.subscribe(params => {
        this.commandeId = +params.get('id');
        this.commandefournisseurService.getCommandefournisseur(this.commandeId).subscribe(commandeFournisseur => {
          this.commandeFournisseur = commandeFournisseur;
           console.log(this.commandeFournisseur)
           this.fournisseurService.getFournisseur(commandeFournisseur.idfournisseur).subscribe(fournisseur=>this.fournisseur=fournisseur);

          
          this.total=commandeFournisseur.total;
          this.etat= commandeFournisseur.etat;
          
          this.commandeFournisseur?.commandelignefournisseur.forEach(ligne => {
            this.produitService.getProduit(ligne.produitId).subscribe((produit: ProduitModule) => {
              ligne.produit = produit;
            });
            this.commandeLigneFournisseurs=this.commandeFournisseur?.commandelignefournisseur;
      
          });
        });
        
      });
    }

    onSubmit() {

      this.commandeFournisseur.commandelignefournisseur=this.commandeLigneFournisseurs
      this.commandeFournisseur.total=this.total
      this.commandeFournisseur.etat=this.etat

      console.log("commande=",this.commandeFournisseur)
      this.commandefournisseurService.updateCommandefournisseur(this.commandeFournisseur).subscribe(
        (response) => {
          console.log(response);
          
          // show a success message
          alert('commande Fournisseur updated successfully!');
          this.router.navigate(['/commandefournisseur/lister']);
        },
        (error) => {
          console.log(error);
          // show an error message
          alert('Error updating commande Fournisseur!');
        }
      );
    }
    addCommandeLigneFournisseur() {
      const commandeLigneFournisseur = new CommandelignefournisseurModule();
      commandeLigneFournisseur.quantite = this.commandeLigneFournisseur.quantite;
      commandeLigneFournisseur.prix = this.commandeLigneFournisseur.produit.prixFournisseur;
    
      const existingLigne = this.commandeLigneFournisseurs.find(ligne => ligne.produit.codebar.toString() == this.barcode);
      if (existingLigne) {
        existingLigne.quantite += this.commandeLigneFournisseur.quantite;
        this.updateTotal(); 

      } else {
        this.produitService.getProductByBarcode(this.barcode.toString()).subscribe(
          produit => {
            commandeLigneFournisseur.produit = produit;
            commandeLigneFournisseur.produitId = produit.id;
            commandeLigneFournisseur.prix = produit.prixFournisseur;
    
            this.commandeLigneFournisseurs.push(commandeLigneFournisseur);
            this.updateTotal(); 

          },
          error => console.log(error)
        );
      }
    }
      
    removeLigne(commandeLigneFournisseur: any) {
      const index = this.commandeLigneFournisseurs.indexOf(commandeLigneFournisseur);
      if (index > -1) {
        this.total -= commandeLigneFournisseur.quantite * commandeLigneFournisseur.prix;
    
        this.commandeLigneFournisseurs.splice(index, 1);
        this.updateTotal(); // call updateTotal() function after removing a product
      }
    }
    
    updateTotal() {
      this.total= this.commandeLigneFournisseurs.reduce((acc, commandelignefournisseur) => acc + commandelignefournisseur.quantite*commandelignefournisseur.prix, 0);
      console.log("commandeFournisseur:", this.commandeFournisseur); // add console log to check the total
    }
}
