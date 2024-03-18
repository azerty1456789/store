import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientModule } from 'app/module/client.module';
import { ClientService } from 'app/service/client/client.service';
import { FactureclientModule } from 'app/module/factureclient.module';
import { FactureclientService } from 'app/service/factureclient/factureclient.service';
import { ProduitModule } from 'app/module/produit.module';
import { ProduitService } from 'app/service/produit/produit.service';
import { UserService } from 'app/auth/service/user.service';
import { TypeticketrestoService } from 'app/service/typeticketresto/typeticketresto.service';
import { UtilisateurModule } from 'app/module/utilisateur.module';
import { TypeticketrestoModule } from 'app/module/typeticketresto.module';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-afficherfacture',
  templateUrl: './afficherfacture.component.html',
  styleUrls: ['./afficherfacture.component.scss']
})
export class AfficherfactureComponent implements OnInit {
factureclient:FactureclientModule;
produit:ProduitModule;
clientName: string;
username:string;
typeticketrestos: TypeticketrestoModule[]=[];


  constructor(private produitService:ProduitService,
    private factureclientService:FactureclientService,
    private clientService:ClientService,
    private typeticketrestoService:TypeticketrestoService,
    private userService:UserService,
    private route: ActivatedRoute,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

 
ngOnInit() {
  const id = +this.route.snapshot.paramMap.get('id');
  this.factureclientService.getFactureclient(id).subscribe((data: FactureclientModule) => {
    this.factureclient = data;
    console.log(data)
    this.userService.getUser(this.factureclient.iduser).subscribe((user: UtilisateurModule) => {
      this.username = user.name;
    })
    // fetch the corresponding produit for each factureligneProduit
    this.factureclient.factureligneProduits.forEach(ligne => {
      this.produitService.getProduit(ligne.produitId).subscribe((produit: ProduitModule) => {
        ligne.produit = produit;
      });
    });
if(this.factureclient.idclient){ // get the client name
  this.clientService.getClient(this.factureclient.idclient).subscribe((client: ClientModule) => {
    this.clientName = client.name;
  });}

  this.typeticketrestoService.getTypeticketrestoes().subscribe(typeticketrestos => {
    this.typeticketrestos = typeticketrestos;
  });
  });
  
}

getTypeticketrestoNom(id: number) {
  if    (this.typeticketrestos.length>0){
  const typeticketresto = this.typeticketrestos?.find(t => t.id === id);
  return  typeticketresto.nom ;}
}
getTypeticketrestovaleur(id: number) {
  if    (this.typeticketrestos.length>0){

  const typeticketresto = this.typeticketrestos?.find(t => t.id === id);
  return  typeticketresto.montant*typeticketresto.pourcentage/100 ;}
}
}
