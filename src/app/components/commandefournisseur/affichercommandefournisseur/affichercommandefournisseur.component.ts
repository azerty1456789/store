import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FournisseurService } from 'app/service/fournisseur/fournisseur.service';
import { CommandefournisseurService } from 'app/service/commandefournisseur/commandefournisseur.service';
import { CommandefournisseurModule } from 'app/module/commandefournisseur.module';
import { ProduitModule } from 'app/module/produit.module';
import { ProduitService } from 'app/service/produit/produit.service';
import { UserService } from 'app/auth/service/user.service';
import { UtilisateurModule } from 'app/module/utilisateur.module';
import { FournisseurModule } from 'app/module/fournisseur.module';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-affichercommandefournisseur',
  templateUrl: './affichercommandefournisseur.component.html',
  styleUrls: ['./affichercommandefournisseur.component.scss']
})
export class AffichercommandefournisseurComponent implements OnInit {
  commandeFournisseur:CommandefournisseurModule;
  username:string;
  fournisseurName:string;
  constructor(private produitService:ProduitService,
    private fournisseurService:FournisseurService,
    private commandefournisseurService:CommandefournisseurService,
    private userService:UserService ,
    private route: ActivatedRoute,
    private router: Router ,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
  this.commandefournisseurService.getCommandefournisseur(id).subscribe((data: CommandefournisseurModule) => {
    this.commandeFournisseur = data;
    console.log(data)
    this.userService.getUser(this.commandeFournisseur.iduser).subscribe((user: UtilisateurModule) => {
      this.username = user.name;
    })
    // fetch the corresponding produit for each factureligneProduit
    this.commandeFournisseur?.commandelignefournisseur.forEach(ligne => {
      this.produitService.getProduit(ligne.produitId).subscribe((produit: ProduitModule) => {
        ligne.produit = produit;
      });

    });

if(this.commandeFournisseur.idfournisseur){ // get the Fournisseur name
  this.fournisseurService.getFournisseur(this.commandeFournisseur.idfournisseur).subscribe((fournisseur: FournisseurModule) => {
    this.fournisseurName = fournisseur.nom;
  });}
  
  });
  }
  onModify(): void {
    this.router.navigate(['/modifiercommandefournisseur', this.commandeFournisseur.id]);
  }

  onDelete(): void {
    this.commandefournisseurService.deleteCommandefournisseur(this.commandeFournisseur.id)
    
      .subscribe(() => {
        alert('commande fournisseur deleted!');
        this.router.navigate(['/commandefournisseur/lister']);
      });
  }

}
