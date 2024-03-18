import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitModule } from 'app/module/produit.module';
import { ProduitService } from 'app/service/produit/produit.service';
import { CommandeclientModule } from 'app/module/commandeclient.module';
import { CommandeclientService } from 'app/service/commandeclient/commandeclient.service';
import { ClientwebModule } from 'app/module/clientweb.module';
import { ClientwebService } from 'app/service/clientweb/clientweb.service';
import { CommandeligneclientModule } from 'app/module/commandeligneclient.module';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-modifiercommandeclient',
  templateUrl: './modifiercommandeclient.component.html',
  styleUrls: ['./modifiercommandeclient.component.scss']
})
export class ModifiercommandeclientComponent implements OnInit {
  commandeId:number;
clientweb:ClientwebModule;
total=0;
commandeligneclients: CommandeligneclientModule[]=[]
etats = ['En attente', 'Validée', 'En cours de traitement', 'Expédiée', 'Livrée', 'Annulée'];
produit: ProduitModule = new ProduitModule();
barcode: string;
commandeclient:CommandeclientModule
  etat: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private produitService:ProduitService,
    private commandeclientService:CommandeclientService,
    private clientwebService:ClientwebService,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.commandeId = +params.get('id');
      this.commandeclientService.getCommandeclient(this.commandeId).subscribe(commandeclient => {
        this.commandeclient = commandeclient;
         console.log(this.commandeclient)
         this.clientwebService.getClientweb(commandeclient.idclientweb).subscribe(clientweb=>this.clientweb=clientweb);

        
        this.total=commandeclient.total;
        this.etat= commandeclient.etat;
        
        this.commandeclient?.commandeligneclient.forEach(ligne => {
          this.produitService.getProduit(ligne.produitId).subscribe((produit: ProduitModule) => {
            ligne.produit = produit;
          });
          this.commandeligneclients=this.commandeclient?.commandeligneclient;
    
        });
      });
      
    });
  }

  onSubmit() {

    this.commandeclient.etat=this.etat

    console.log("commande=",this.commandeclient)
    this.commandeclientService.updateCommandeclient(this.commandeclient).subscribe(
      (response) => {
        console.log(response);
        
        // show a success message
        alert('commande client updated successfully!');
        this.router.navigate(['/commandeclient/lister']);
      },
      (error) => {
        console.log(error);
        // show an error message
        alert('Error updating commande client!');
      }
    );
  }

}
