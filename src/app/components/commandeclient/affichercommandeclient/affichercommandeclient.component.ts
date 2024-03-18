import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitModule } from 'app/module/produit.module';
import { ProduitService } from 'app/service/produit/produit.service';
import { CommandeclientModule } from 'app/module/commandeclient.module';
import { CommandeclientService } from 'app/service/commandeclient/commandeclient.service';
import { ClientwebModule } from 'app/module/clientweb.module';
import { ClientwebService } from 'app/service/clientweb/clientweb.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'

@Component({
  selector: 'app-affichercommandeclient',
  templateUrl: './affichercommandeclient.component.html',
  styleUrls: ['./affichercommandeclient.component.scss']
})
export class AffichercommandeclientComponent implements OnInit {
commandeclient:CommandeclientModule;
clientwebName:string;
  constructor(private produitService:ProduitService,
    private clientwebService:ClientwebService,
    private commandeclientService:CommandeclientService,
    private route: ActivatedRoute,
    private router: Router  ,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
this.commandeclientService.getCommandeclient(id).subscribe((data:CommandeclientModule)=>{
  data.commandeligneclient.forEach(ligne => {
    this.produitService.getProduit(ligne.produitId).subscribe((produit: ProduitModule) => {
      ligne.produit = produit;
    });
  
  });
  this.commandeclient = data;
  
  if(this.commandeclient.idclientweb){ 
    console.log(this.commandeclient.idclientweb)
    this.clientwebService.getClientweb(this.commandeclient.idclientweb).subscribe((clientweb: ClientwebModule) => {
      this.clientwebName = clientweb.nom;
    });}
})


  
  }


  onModify(): void {
    this.router.navigate(['/modifiercommandeclient', this.commandeclient.id]);
  }

  onDelete(): void {
    this.commandeclientService.deleteCommandeclient(this.commandeclient.id)
    
      .subscribe(() => {
        alert('commande client deleted!');
        this.router.navigate(['/commandeclient/lister']);
      });
  }


}
