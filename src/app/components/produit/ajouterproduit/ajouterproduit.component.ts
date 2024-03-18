import { Component, OnInit } from '@angular/core';
import { ProduitModule } from 'app/module/produit.module';
import { ProduitService } from 'app/service/produit/produit.service';
import { CategorieModule } from 'app/module/categorie.module';
import { CategorieService } from 'app/service/categorie/categorie.service';
import { PhotoproduitService } from 'app/service/photoproduit/photoproduit.service';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';
import { DepotModule } from 'app/module/depot.module';
import { DepotService } from 'app/service/depot/depot.service';
import { RangementModule } from 'app/module/rangement.module';
import { RangementService } from 'app/service/rangement/rangement.service';
import { ColonneModule } from 'app/module/colonne.module';
import { ColonneService } from 'app/service/colonne/colonne.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'




@Component({
  selector: 'app-ajouterproduit',
  templateUrl: './ajouterproduit.component.html',
  styleUrls: ['./ajouterproduit.component.scss']
})
export class AjouterproduitComponent implements OnInit {
  selectedDepot:number;
  depots:DepotModule[]=[];
  selectedColonne:number;
  colonnes:ColonneModule[]=[];
  stock:number;
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
    BarcodeFormat.CODE_39,
  ];
scanner: boolean;
  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = true;


  newProduit: ProduitModule = {
    id: 0,
    codebar: null,
    nom: '',
    qteInPacket: null,
    color: '',
    description: '',
    categorieid: null,
    prixFournisseur: null,
    prixvente: null,

    dateexpiration: null,
    ispiece: false,
    produitparent: null,
    reductionprix: 0,
    taxe: 0,
    photoproduits: []
  }
  categories: CategorieModule[];
  selectedFiles: File[]=[];
  parent: ProduitModule;

  constructor(private produitService: ProduitService, 
    private categorieService: CategorieService,
    private photoproduitService:PhotoproduitService,
    private depotService:DepotService,
    private colonneService:ColonneService,
    private rangementService:RangementService,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

  ngOnInit(): void {
    this.getCategories();
    this.getDepots();
  }
  getCategories(): void {
    this.categorieService.getCategories().subscribe(
      categories => {
        this.categories = categories;
      },
      error => {
        console.log('Error retrieving categories', error);
      }
    );
  }

  getDepots():void {
    this.depotService.getDepots().subscribe(depots => {
      this.depots = depots.filter(depot => depot.type == "vente");
      if (this.depots.length > 0) {
      this.selectedDepot = this.depots[0].id;
 console.log(this.selectedDepot);
      this.colonneService.getColonnesByDepotId(this.selectedDepot).subscribe(colonnes=>{this.colonnes=colonnes;
if (this.colonnes.length==0){
  const newColonne = new ColonneModule;
  newColonne.id=0;
  newColonne.nom= "colonne-1";
  newColonne.description="";
  newColonne.iddepot= this.selectedDepot;
console.log(newColonne)
  
  this.colonneService.addColonne(newColonne).subscribe(createdColonne => {
    this.colonnes = [createdColonne];
    console.log(createdColonne);
  });
}

      })}
      if (this.depots.length == 0) {
        const newDepot = new DepotModule
        newDepot.nom= "store";
        newDepot.type= "vente";
        newDepot.description= "";
        newDepot.id= 0;
        newDepot.adresse ="";

        this.depotService.addDepot(newDepot).subscribe(createdDepot => {
          this.depots = [createdDepot];
          this.selectedDepot = createdDepot.id;
          console.log(createdDepot)
          const newColonne = new ColonneModule;
      newColonne.id=0;
      newColonne.nom= "colonne-1";
      newColonne.description="";
      newColonne.iddepot= createdDepot.id;
      this.colonneService.addColonne(newColonne).subscribe(createdColonne => {
        this.colonnes = [createdColonne];
        console.log(createdColonne);
      });
      })
      

     
    
    
    }

   
    });
  }
  
  onSubmit() {
    if (!this.newProduit.nom) {
      alert('Please enter product name ');
      return;
    }
    if (!this.newProduit.codebar) {
      alert('Please enter a barcode ');
      return;
    }
    if (!this.newProduit.prixvente) {
      alert('Please enter price ');
      return;
    }
    if (!this.newProduit.ispiece &&!this.newProduit.prixFournisseur) {
      alert('Please enter provider price ');
      return;
    }
   
    if (this.newProduit.ispiece && !this.newProduit.produitparent) {
      alert('Please enter parent product  ');
      return;
    }
    if (this.newProduit.ispiece && !this.newProduit.qteInPacket) {
      alert('Please enter packet quantity  ');
      return;
    }
    if (!this.newProduit.ispiece && !this.selectedColonne) {
      alert('Please select colonne  ');
      return;
    }
    if (!this.newProduit.ispiece && !this.stock) {
      alert('Please enter stock  ');
      return;
    }
    const newProduit = new ProduitModule();
    newProduit.id = this.newProduit.id;
    newProduit.codebar = this.newProduit.codebar;
    newProduit.nom = this.newProduit.nom;
    newProduit.color = this.newProduit.color;
    newProduit.description = this.newProduit.description;
    newProduit.categorieid = this.newProduit.categorieid;

    newProduit.prixvente = this.newProduit.prixvente;

    newProduit.dateexpiration = this.newProduit.dateexpiration;

    newProduit.ispiece = this.newProduit.ispiece;
    if (newProduit.ispiece ){
      newProduit.prixFournisseur=this.parent.prixFournisseur/this.newProduit.qteInPacket;
      newProduit.produitparent = this.parent.id;
      newProduit.qteInPacket = this.newProduit.qteInPacket;

    }else {    newProduit.prixFournisseur = this.newProduit.prixFournisseur;
    }
    newProduit.reductionprix = this.newProduit.reductionprix;
    newProduit.taxe = this.newProduit.taxe;


    console.log(newProduit); //  check the values of newProduit

    this.produitService.addProduit(newProduit).subscribe(
      (response) => {
        console.log("reponse is:",response);
        const produitId = response.id;
        const newRangement = new RangementModule();
newRangement.nom = "rangement-"+this.newProduit.nom;
newRangement.idcolonne = this.selectedColonne
newRangement.idproduit = produitId
newRangement.stock = this.stock
newRangement.stockpiece = 0


        this.rangementService.addRangement(newRangement).subscribe(
          (response)=>{
            console.log(response);
          },
          (error) => {
            console.error('Failed to create rangement:', error);
          }
        )
        if (this.selectedFiles.length>0){
      this.photoproduitService.uploadPhoto(produitId, this.selectedFiles ).subscribe(
        (photos) => {
          console.log('Uploaded photos:', photos);
        },
        (error) => {
          console.error('Failed to upload photos:', error);
        }
        );}
        
        // clear the form and show a success message
        this.newProduit = {
          id: 0,
          codebar: null,
          nom: '',
          qteInPacket: null,
          color: '',
          description: '',
          categorieid: null,
          prixFournisseur: null,
          prixvente: null,
        
          dateexpiration: null,
          ispiece: false,
  produitparent: null,
  reductionprix: 0,
  taxe: 0,
  photoproduits: [],



        };
        this.selectedFiles=[];
        this.stock=null;
        this.selectedColonne=null;
        alert('New produit added successfully!');
      },
      (error) => {
        console.log(error);
        // show an error message
        alert('Error adding new produit!');
      }
    );  
  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.selectedFiles = event.target.files;
      
    }
  }

 

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.newProduit.codebar= Number(this. qrResultString )
    console.log(this.qrResultString)
    this.scanner=false
  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }


  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }
 
  onProduitParentChange() {
    if (!this.newProduit.produitparent){
      this.parent=null

    }
    else{
    this.produitService.getProductByBarcode(this.newProduit.produitparent.toString()).subscribe(
      (produit) => {
       
        this.parent = produit;
      },
      (error) => {
        this.parent=null
        console.log(error);
      }
    );
  }
}
 
}
