import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import 'hammerjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@core/core.module';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule, CoreThemeCustomizerModule } from '@core/components';

import { coreConfig } from 'app/app-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { JwtInterceptor, ErrorInterceptor } from 'app/auth/helpers';
import { AuthGuard } from 'app/auth/helpers/auth.guards';

import { CaisseComponent } from './components/caisse/caisse/caisse.component';
import { AjoutercategorieComponent } from './components/categorie/ajoutercategorie/ajoutercategorie.component';
import { ListercategorieComponent } from './components/categorie/listercategorie/listercategorie.component';
import { AffichercategorieComponent } from './components/categorie/affichercategorie/affichercategorie.component';
import { AjouterdepotComponent } from './components/depot/ajouterdepot/ajouterdepot.component';
import { ListerdepotComponent } from './components/depot/listerdepot/listerdepot.component';
import { AfficherdepotComponent } from './components/depot/afficherdepot/afficherdepot.component';
import { AjouterfournisseurComponent } from './components/fournisseur/ajouterfournisseur/ajouterfournisseur.component';
import { ListerfournisseurComponent } from './components/fournisseur/listerfournisseur/listerfournisseur.component';
import { AfficherfournisseurComponent } from './components/fournisseur/afficherfournisseur/afficherfournisseur.component';
import { ListerrapportComponent } from './components/rapport/listerrapport/listerrapport.component';
import { ListerfactureComponent } from './components/facture/listerfacture/listerfacture.component';
import { AfficherfactureComponent } from './components/facture/afficherfacture/afficherfacture.component';
import { PayercreditComponent } from './components/credit/payercredit/payercredit.component';
import { AjouterclientComponent } from './components/client/ajouterclient/ajouterclient.component';
import { ListerclientComponent } from './components/client/listerclient/listerclient.component';
import { AfficherclientComponent } from './components/client/afficherclient/afficherclient.component';
import { AjouterfermetureCaisseComponent } from './components/fermetureCaisse/ajouterfermeture-caisse/ajouterfermeture-caisse.component';
import { ListerfermetureCaisseComponent } from './components/fermetureCaisse/listerfermeture-caisse/listerfermeture-caisse.component';
import { AfficherfermetureCaisseComponent } from './components/fermetureCaisse/afficherfermeture-caisse/afficherfermeture-caisse.component';
import { AjouterproduitComponent } from './components/produit/ajouterproduit/ajouterproduit.component';
import { ListerproduitComponent } from './components/produit/listerproduit/listerproduit.component';
import { AfficherproduitComponent } from './components/produit/afficherproduit/afficherproduit.component';
import { ModifierclientComponent } from './components/client/modifierclient/modifierclient.component';
import { ModifiercategorieComponent } from './components/categorie/modifiercategorie/modifiercategorie.component';
import { ModifierproduitComponent } from './components/produit/modifierproduit/modifierproduit.component';
import { UserProfileComponent } from './components/profile/user-profile/user-profile.component';
import { ChangePasswordComponent } from './components/profile/change-password/change-password.component';
import { AjouterutilisateurComponent } from './components/utilisateur/ajouterutilisateur/ajouterutilisateur.component';
import { ListerutilisateurComponent } from './components/utilisateur/listerutilisateur/listerutilisateur.component';
import { AfficherutilisateurComponent } from './components/utilisateur/afficherutilisateur/afficherutilisateur.component';
import { ModifierutilisateurComponent } from './components/utilisateur/modifierutilisateur/modifierutilisateur.component';
import { ModifierdepotComponent } from './components/depot/modifierdepot/modifierdepot.component';
import { AjoutercolonneComponent } from './components/depot/ajoutercolonne/ajoutercolonne.component';
import { AffichercolonneComponent } from './components/depot/affichercolonne/affichercolonne.component';
import { AjouterrangementComponent } from './components/depot/ajouterrangement/ajouterrangement.component';
import { ModifiercolonneComponent } from './components/depot/modifiercolonne/modifiercolonne.component';
import { AfficherrangementComponent } from './components/depot/afficherrangement/afficherrangement.component';
import { ModifierrangementComponent } from './components/depot/modifierrangement/modifierrangement.component';
import { AjoutertypeticketrestoComponent } from './components/typeticketresto/ajoutertypeticketresto/ajoutertypeticketresto.component';
import { ListertypeticketrestoComponent } from './components/typeticketresto/listertypeticketresto/listertypeticketresto.component';
import { AffichertypeticketrestoComponent } from './components/typeticketresto/affichertypeticketresto/affichertypeticketresto.component';
import { ModifiertypeticketrestoComponent } from './components/typeticketresto/modifiertypeticketresto/modifiertypeticketresto.component';
import { ModifierfournisseurComponent } from './components/fournisseur/modifierfournisseur/modifierfournisseur.component';
import { AjoutercommandefournisseurComponent } from './components/commandefournisseur/ajoutercommandefournisseur/ajoutercommandefournisseur.component';
import { ListercommandefournisseurComponent } from './components/commandefournisseur/listercommandefournisseur/listercommandefournisseur.component';
import { AffichercommandefournisseurComponent } from './components/commandefournisseur/affichercommandefournisseur/affichercommandefournisseur.component';
import { ModifiercommandefournisseurComponent } from './components/commandefournisseur/modifiercommandefournisseur/modifiercommandefournisseur.component';
import { InventaireComponent } from './components/inventaire/inventaire/inventaire.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ListercommandeclientComponent } from './components/commandeclient/listercommandeclient/listercommandeclient.component';
import { AjoutercommandeclientComponent } from './components/commandeclient/ajoutercommandeclient/ajoutercommandeclient.component';
import { AffichercommandeclientComponent } from './components/commandeclient/affichercommandeclient/affichercommandeclient.component';
import { ModifiercommandeclientComponent } from './components/commandeclient/modifiercommandeclient/modifiercommandeclient.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { QRCodeModule } from 'angularx-qrcode';
import { DeplacerproduitComponent } from './components/deplacerproduit/deplacerproduit/deplacerproduit.component';
import { AjouterproduitdefectueuxComponent } from './components/produitdefectueux/ajouterproduitdefectueux/ajouterproduitdefectueux.component';
import { AfficherproduitdefectueuxComponent } from './components/produitdefectueux/afficherproduitdefectueux/afficherproduitdefectueux.component';
import { ModifierproduitdefectueuxComponent } from './components/produitdefectueux/modifierproduitdefectueux/modifierproduitdefectueux.component';
import { ListerproduitdefectueuxComponent } from './components/produitdefectueux/listerproduitdefectueux/listerproduitdefectueux.component';
import { TimbrefiscalComponent } from './components/timbrefiscal/timbrefiscal/timbrefiscal.component';
import { ModifierfermetureCaisseComponent } from './components/fermetureCaisse/modifierfermeture-caisse/modifierfermeture-caisse.component';
import { AjouterdevisComponent } from './components/devis/ajouterdevis/ajouterdevis.component';
import { ListerdevisComponent } from './components/devis/listerdevis/listerdevis.component';
import { AfficherdevisComponent } from './components/devis/afficherdevis/afficherdevis.component';
import { QuickaddclientComponent } from './components/quickaddclient/quickaddclient/quickaddclient.component';
import { QuickaddproduitComponent } from './components/quickaddproduit/quickaddproduit/quickaddproduit.component';

const appRoutes: Routes = [

  {
    path:'typeticketresto/ajouter',component:AjoutertypeticketrestoComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'affichertypeticketresto/:id',component: AffichertypeticketrestoComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'modifiertypeticketresto/:id',component: ModifiertypeticketrestoComponent,
    canActivate: [AuthGuard]

  },

  {
    path:'typeticketresto/lister',component:ListertypeticketrestoComponent,
    canActivate: [AuthGuard]

  },


  {
    path:'modifier-password',component:ChangePasswordComponent,
    canActivate: [AuthGuard]

  },
  {
    path:'user-profile',component:UserProfileComponent,
    canActivate: [AuthGuard]

  },
{
    path:'caisse',component:CaisseComponent,
    canActivate: [AuthGuard]

  },
  {
    path:'inventaire',component:InventaireComponent,
    canActivate: [AuthGuard]

  },
  {
    path:'deplacerproduit',component:DeplacerproduitComponent,
    canActivate: [AuthGuard]

  },
  {
    path:'facture/lister',component:ListerfactureComponent,
    canActivate: [AuthGuard]

  },
  {
    path:'afficherfactureclient/:id',component:AfficherfactureComponent,
    canActivate: [AuthGuard]

  },


  {
    path:'commandefournisseur/ajouter',component:AjoutercommandefournisseurComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'affichercommandefournisseur/:id',component: AffichercommandefournisseurComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'modifiercommandefournisseur/:id',component: ModifiercommandefournisseurComponent,
    canActivate: [AuthGuard]

  },

  {
    path:'commandefournisseur/lister',component:ListercommandefournisseurComponent,
    canActivate: [AuthGuard]

  },





  {
    path:'commandeclient/ajouter',component:AjoutercommandeclientComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'affichercommandeclient/:id',component: AffichercommandeclientComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'modifiercommandeclient/:id',component: ModifiercommandeclientComponent,
    canActivate: [AuthGuard]

  },

  {
    path:'commandeclient/lister',component:ListercommandeclientComponent,
    canActivate: [AuthGuard]

  },



  {
    path:'credit/payer',component:PayercreditComponent,
    canActivate: [AuthGuard]

  },
  {
    path:'client/ajouter',component:AjouterclientComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'afficherclient/:id',component: AfficherclientComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'modifierclient/:id',component: ModifierclientComponent,
    canActivate: [AuthGuard]

  },

  {
    path:'client/lister',component:ListerclientComponent,
    canActivate: [AuthGuard]

  },



  {
    path:'devis/ajouter',component:AjouterdevisComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'afficherdevis/:id',component: AfficherdevisComponent,
    canActivate: [AuthGuard]

  },
 

  {
    path:'devis/lister',component:ListerdevisComponent,
    canActivate: [AuthGuard]

  },


  {
    path:'fermeturecaisse/ajouter',component:AjouterfermetureCaisseComponent,
    canActivate: [AuthGuard]

  },
  {
    path:'modifierfermeturecaisse/:id',component:ModifierfermetureCaisseComponent,
    canActivate: [AuthGuard]

  },
  {
    path:'fermeturecaisse/lister',component:ListerfermetureCaisseComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'afficherfermeturecaisse/:id',component: AfficherfermetureCaisseComponent,
    canActivate: [AuthGuard]

  },
  {
    path:'produit/ajouter',component:AjouterproduitComponent,
    canActivate: [AuthGuard]

  },
  {
    path:'produit/lister',component:ListerproduitComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'afficherproduit/:id',component: AfficherproduitComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'modifierproduit/:id',component: ModifierproduitComponent,
    canActivate: [AuthGuard]

  },

  {
    path:'categorie/ajouter',component:AjoutercategorieComponent,
    canActivate: [AuthGuard]

  },
  {
    path:'categorie/lister',component:ListercategorieComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'affichercategorie/:id',component: AffichercategorieComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'modifiercategorie/:id',component: ModifiercategorieComponent,
    canActivate: [AuthGuard]

  },


  {
    path:'depot/ajouter',component:AjouterdepotComponent,
    canActivate: [AuthGuard]

  },
  {
    path:'depot/lister',component:ListerdepotComponent,
    canActivate: [AuthGuard]

  },
  {
    path:'afficherdepot/:id',component:AfficherdepotComponent,
    canActivate: [AuthGuard]

  },
  {
    path:'modifierdepot/:id',component:ModifierdepotComponent,
    canActivate: [AuthGuard]

  },
  {
    path:'depot/:id/ajoutercolonne',component:AjoutercolonneComponent,
    canActivate: [AuthGuard]

  },
  {
    path:'affichercolonne/:id',component:AffichercolonneComponent,
    canActivate: [AuthGuard]

  },
  {
    path:'afficherrangement/:id',component:AfficherrangementComponent,
    canActivate: [AuthGuard]

  },
  {
    path:'modifiercolonne/:id',component:ModifiercolonneComponent,
    canActivate: [AuthGuard]

  },
  {
    path:'colonne/:id/ajouterrangement',component:AjouterrangementComponent,
    canActivate: [AuthGuard]

  },
  {
    path:'modifierrangement/:id',component:ModifierrangementComponent,
    canActivate: [AuthGuard]

  },

  {
    path:'fournisseur/ajouter',component:AjouterfournisseurComponent,
    canActivate: [AuthGuard]

  },
  {
    path:'fournisseur/lister',component:ListerfournisseurComponent,
    canActivate: [AuthGuard]

  },
  {
    path:'afficherfournisseur/:id',component:AfficherfournisseurComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'modifierfournisseur/:id',component: ModifierfournisseurComponent,
    canActivate: [AuthGuard]

  },

  {
    path:'utilisateur/lister',component:ListerutilisateurComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] } 

  },
  {
    path:'utilisateur/ajouter',component:AjouterutilisateurComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] } 
  },
  {
    path:'afficherutilisateur/:id',component:AfficherutilisateurComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] } 

  },
  {
    path: 'modifierutilisateur/:id',component: ModifierutilisateurComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] } 

  },
  {
    path:'rapport',component:ListerrapportComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] } 


  },

  {
    path:'timbrefiscal',component:TimbrefiscalComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] } 


  },
  {
    path:'produitdefectueux/ajouter',component:AjouterproduitdefectueuxComponent,
    canActivate: [AuthGuard]

  },
  {
    path:'produitdefectueux/lister',component:ListerproduitdefectueuxComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'afficherproduitdefectueux/:id',component: AfficherproduitdefectueuxComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'modifierproduitdefectueux/:id',component: ModifierproduitdefectueuxComponent,
    canActivate: [AuthGuard]

  },


  {
    path: 'pages',
    loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)

  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
    //canActivate: [AuthGuard]



  },
 
  {
    path: '**',
    redirectTo: '/pages/miscellaneous/error' //Error 404 - Page not found
  }
];

@NgModule({
  declarations: [AppComponent,
  CaisseComponent,
        AjoutercategorieComponent,
        ListercategorieComponent,
        AffichercategorieComponent,
        AjouterdepotComponent,
        ListerdepotComponent,
        AfficherdepotComponent,
        AjouterfournisseurComponent,
        ListerfournisseurComponent,
        AfficherfournisseurComponent,
        ListerrapportComponent,
        ListerfactureComponent,
        AfficherfactureComponent,
        PayercreditComponent,
        AjouterclientComponent,
        ListerclientComponent,
        AfficherclientComponent,
        AjouterfermetureCaisseComponent,
        ListerfermetureCaisseComponent,
        AfficherfermetureCaisseComponent,
        AjouterproduitComponent,
        ListerproduitComponent,
        AfficherproduitComponent,
        ModifierclientComponent,
        ModifiercategorieComponent,
        ModifierproduitComponent,
        UserProfileComponent,
        ChangePasswordComponent,
        AjouterutilisateurComponent,
        ListerutilisateurComponent,
        AfficherutilisateurComponent,
        ModifierutilisateurComponent,
        ModifierdepotComponent,
        AjoutercolonneComponent,
        AffichercolonneComponent,
        AjouterrangementComponent,
        ModifiercolonneComponent,
        AfficherrangementComponent,
        ModifierrangementComponent,
        AjoutertypeticketrestoComponent,
        ListertypeticketrestoComponent,
        AffichertypeticketrestoComponent,
        ModifiertypeticketrestoComponent,
        ModifierfournisseurComponent,
        AjoutercommandefournisseurComponent,
        ListercommandefournisseurComponent,
        AffichercommandefournisseurComponent,
        ModifiercommandefournisseurComponent,
        InventaireComponent,
        ListercommandeclientComponent,
        AjoutercommandeclientComponent,
        AffichercommandeclientComponent,
        ModifiercommandeclientComponent,
        DeplacerproduitComponent,
        AjouterproduitdefectueuxComponent,
        AfficherproduitdefectueuxComponent,
        ModifierproduitdefectueuxComponent,
        ListerproduitdefectueuxComponent,
        TimbrefiscalComponent,
        ModifierfermetureCaisseComponent,
        AjouterdevisComponent,
        ListerdevisComponent,
        AfficherdevisComponent,
        QuickaddclientComponent,
        QuickaddproduitComponent,
],
  imports: [
    NgbTypeaheadModule,
    PaginationModule.forRoot(),
    BrowserModule,
    NgxBarcodeModule,
    QRCodeModule,
    BrowserAnimationsModule,
    ZXingScannerModule,

    HttpClientModule,
	        NgxPaginationModule, 

    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled', // Add options right here
      relativeLinkResolution: 'legacy'
    }),
    TranslateModule.forRoot(),

    //NgBootstrap
    NgbModule,

    // Core modules
    CoreModule.forRoot(coreConfig),
    CoreCommonModule,
    CoreSidebarModule,
    CoreThemeCustomizerModule,

    // App modules
    LayoutModule,
    SampleModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
],
  bootstrap: [AppComponent]
})
export class AppModule {}
