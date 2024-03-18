import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ClientService } from 'app/service/client/client.service'; 
import { ClientModule } from 'app/module/client.module';
import { ProduitService } from 'app/service/produit/produit.service';
import { FactureclientModule } from 'app/module/factureclient.module';
import { FactureclientService } from 'app/service/factureclient/factureclient.service';
import { FactureligneproduitModule } from 'app/module/factureligneproduit.module';
import { RangementService } from 'app/service/rangement/rangement.service';
import { ColonneService } from 'app/service/colonne/colonne.service';
import { DepotService } from 'app/service/depot/depot.service';
import { TicketrestoModule } from 'app/module/ticketresto.module';
import { TypeticketrestoModule } from 'app/module/typeticketresto.module';
import { TypeticketrestoService } from 'app/service/typeticketresto/typeticketresto.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';
import { TimbrefiscalModule } from 'app/module/timbrefiscal.module';
import { TimbrefiscalService } from 'app/service/timbrefiscal/timbrefiscal.service';
import { ActivatedRoute } from '@angular/router';
import { DevisModule } from 'app/module/devis.module';
import { ProduitModule } from 'app/module/produit.module';
@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.component.scss']
})
export class CaisseComponent implements OnInit {
  @ViewChild('barcodeInput') barcodeInput!: ElementRef<HTMLInputElement>;
timbrefiscal:TimbrefiscalModule
  clients: ClientModule[];
  typetickets: TypeticketrestoModule[];
  time: Date;
  selectedClient: ClientModule | undefined;
  selectedTypeticket:TypeticketrestoModule ;
  paymentMethod: string="cash";
  amountPaid= 0;
  tableData: any[] = [];
quantityInput: HTMLInputElement;
  selectedInput: HTMLInputElement;
  ticketNumber: number;
  montant: number = 0;
  pourcentage: number = 0;
tickets: any[] = [];
ticketcode:string="";
totalTicketAmount:number= 0;
accountowner:string="";
checkcompte:string="";
typeticketrestoMap: { [id: number]: any } = {};
searchText:string;
  tabledataname:string="";
  storedtabledatas:any[]=[];
  selectedTableDataName:string;



  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];
scanner: boolean;
  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = true;
  cachier: string;

  devis: DevisModule;

produitsrecherche:ProduitModule[]


  constructor(private factureclientService:FactureclientService,
    private clientService: ClientService,
    private produitService: ProduitService,
    private rangementService:RangementService,
    private colonneService:ColonneService,
    private depotService:DepotService,
    private typeticketrestoService:TypeticketrestoService,
private timbrefiscalService:TimbrefiscalService,
    private _translateService: CoreTranslationService,
    private route: ActivatedRoute) {
      this._translateService.translate(english, french, arabic);
  
     }

  ngOnInit(): void {
    this.retrieveDevis();

    
    this.setCurrentTime();
    this.getClients();
    this.getTypetickets();
    this.gettabledatas();
    this.cachier=this.getCurrentUser()?.given_name;
    this.factureclientService.getFactureclients().subscribe(factures => {
      const ticketNumber = factures.reduce((max, facture) => facture.numeroticket > max ? facture.numeroticket : max, 0) + 1;
      this.ticketNumber = ticketNumber;
    });
this.timbrefiscalService.getTimbrefiscal(1).subscribe(timbrefiscal=>this.timbrefiscal=timbrefiscal)
  }
    getCurrentUser(): any {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        return JSON.parse(currentUser);
      }
}
search(searchText:string){
  if (searchText){
  this.produitService.getProduitsByNomLike(searchText).subscribe(produits=>{this.produitsrecherche=produits
  })}
}
selectProduit(produit:ProduitModule){
  this.barcodeInput.nativeElement.value = produit.codebar.toString();
  this.searchText=null
}
retrieveDevis(): void {
  const devisJson = this.route.snapshot.queryParamMap.get('devis');
  this.devis = JSON.parse(devisJson);
if (this.devis){
   this.tableData = this.tableData.concat(this.devis.devisligneproduit.map(item => {
    return {
      barcode: item.produit?.codebar,
      quantity: item.quantite,
      name: item.produit?.nom,
      produitid: item.produitId,
      unitPrice: item.produit.prixvente,
      reduction: item.produit.reductionprix,
      taxe: item.produit.taxe,
      prixfournisseur: item.produit.prixFournisseur,
            total: item.quantite * item.prix
    };
  }));

}
 
  }

  setCurrentTime() {
    this.time = new Date();
  }
  getClients(): void {
    this.clientService.getClients()
      .subscribe(clients => this.clients = clients);
  }
  getTypetickets(): void {
    this.typeticketrestoService.getTypeticketrestoes()
      .subscribe(typetickets => this.typetickets = typetickets);
  }


  onClientSelect(client: ClientModule): void {
    this.selectedClient = client;
    console.log('Selected client:', this.selectedClient);
  }
  onTypeticketrestoSelect(Typeticket: TypeticketrestoModule): void {
    this.selectedTypeticket = Typeticket;
    console.log('Selected Typeticketresto:', this.selectedTypeticket);
  }

  onPaymentMethodChange(value: string) {
    this.paymentMethod = value;
    
  }
  
  onAddClick(barcodeInput: HTMLInputElement) {
    const barcode = barcodeInput.value;
  
    // Check if item with the same barcode already exists in the table
    const existingItem = this.tableData.find(item => item.barcode == barcode);
  
    if (existingItem) {
      // Item already exists in table, update its quantity
      existingItem.quantity++;
      existingItem.total = existingItem.quantity * (existingItem.unitPrice-(existingItem.unitPrice*existingItem.reduction/100)+(existingItem.unitPrice*existingItem.taxe/100));

      // Hide the message in case it was previously shown
      document.getElementById("barcodeMsg").style.display = "none";
    } else {
      // Item does not exist in table, retrieve product information using barcode
      this.produitService.getProductByBarcode(barcode).subscribe(
        produit => {
          const newRow = {
            barcode: produit.codebar,
            quantity: 1,
            name: produit.nom,
            produitid: produit.id,
            unitPrice: produit.prixvente,
            reduction: produit.reductionprix,
            taxe: produit.taxe,
            prixfournisseur:produit.prixFournisseur,
            total: produit.prixvente-(produit.prixvente*produit.reductionprix/100)+(produit.prixvente*produit.taxe/100),
          };
  
          // Add new row to the table
          this.tableData.push(newRow);
  
          // Hide the message in case it was shown
          document.getElementById("barcodeMsg").style.display = "none";
        },
        error => {
          // Show the "Barcode does not exist" message
          document.getElementById("barcodeMsg").style.display = "block";
        }
      );
    }
  
    barcodeInput.value = "";
    barcodeInput.focus();
  }
  
  updateTotal(item: any) {
    item.total = item.quantity * (item.unitPrice-(item.unitPrice*item.reduction/100)+(item.unitPrice*item.taxe/100));
  }
  removeItem(item: any) {
    const index = this.tableData.indexOf(item);
    if (index > -1) {
      this.tableData.splice(index, 1);
    }
  }
  get totalPurchase(): number {
    if (this.timbrefiscal?.montant== null){
      return this.tableData.reduce((acc, row) => acc + row.total, 0);

    }
    return this.tableData.reduce((acc, row) => acc + row.total, this.timbrefiscal?.montant);
  }
  

  onSave() {
    // Add Total Purchase to client.credit
    if (this.selectedClient && this.paymentMethod=="credit") {
      console.log('Selected client:', this.selectedClient);
      console.log('Total Purchase:', this.totalPurchase);
  
      this.clientService.updateCredit(this.selectedClient.id, this.totalPurchase)
        .subscribe(() => {
          console.log('Credit updated successfully.');
        }, (error) => {
          console.error('Error updating credit:', error);
        });
    }
    if (this.selectedClient && this.paymentMethod=="ticket&credit") {
      console.log('Selected client:', this.selectedClient);
      console.log('Total Purchase:', this.totalPurchase);
  
      this.clientService.updateCredit(this.selectedClient.id, this.totalPurchase-this.totalTicketAmount)
        .subscribe(() => {
          console.log('Credit updated successfully.');
        }, (error) => {
          console.error('Error updating credit:', error);
        });
    }
    
  
    // Set the amount paid based on the payment method
    let amountPaid = 0;
    if (this.paymentMethod === "cash") {
      amountPaid = this.amountPaid;
    } else if (this.paymentMethod === "check"||this.paymentMethod === "ticket_resto") {
      amountPaid = this.totalPurchase;

    }
  
    // Save the invoice and reset the tableData 
    // Create a new instance of FactureclientModule
    const factureclient = new FactureclientModule();
    factureclient.datefacture = new Date(); // Set the date
    factureclient.montantpaye = amountPaid;
    factureclient.montantretourne = amountPaid - this.totalPurchase;
    factureclient.modepayment = this.paymentMethod;
    factureclient.checkcompte =this.checkcompte
    factureclient.iduser=this.getCurrentUser()?.unique_name
    factureclient.totalticketresto=this.totalTicketAmount
    factureclient.timbrefiscal=this.timbrefiscal.montant
    factureclient.numeroticket=this.ticketNumber
    factureclient.checkproprietaire=this.accountowner
    factureclient.ticketrestos = this.tickets.map(ticket => { // Set the ticketrestos
      const ticketResto = new TicketrestoModule();
      ticketResto.typeticketrestoid = ticket.typeticketrestoid;
      ticketResto.code = ticket.code;
      return ticketResto;
    });
    if (this.selectedClient) {
      factureclient.idclient = this.selectedClient.id;
    }
    factureclient.factureligneProduits = this.tableData.map(row => { // Set the lignes
      const ligne = new FactureligneproduitModule();
      ligne.produitId = row.produitid;
      ligne.produit = row.name;
      ligne.quantite = row.quantity;
      ligne.prix=row.unitPrice-(row.unitPrice*row.reduction/100)+(row.unitPrice*row.taxe/100);
      ligne.prixfournisseur=row.prixfournisseur
// Update rangement.stock
console.log("id=",ligne.produitId)
this.rangementService.updateRangementStock(ligne.produitId,row.quantity).subscribe(rangement=>
  console.log(`Rangement ${rangement.nom} updated successfully.`))

/*
 this.produitService.getProduit(ligne.produitId).subscribe((produit) => {
    if (produit.ispiece){

    this.produitService.getProductByBarcode(produit.produitparent.toString()).subscribe((produitparent) => {
    this.rangementService.getRangementventeByProduitId(produitparent.id).subscribe((rangement) => {
      
      
      if (rangement) {
          rangement.stockpiece = rangement.stockpiece - row.quantity;
                  
                  while (rangement.stockpiece < 0) {
                    rangement.stockpiece += produit.qteInPacket;
                    rangement.stock -= 1;
                  }
                  this.rangementService.updateRangement(rangement).subscribe(() => {
                    console.log(`Rangement ${rangement.nom} updated successfully.`);
                  }, )
       
        
      } else {
        console.warn(`No rangements found for product with ID ${row.produitid}.`);
      }
    }, (error) => {
      console.error(`Error getting rangements for product with ID ${row.produitid}: ${error}`);
    });
  })
}

else{
  this.rangementService.getRangementventeByProduitId(row.produitid).subscribe((rangement) => {

  if (rangement) {
      rangement.stock = rangement.stock - row.quantity;
      
      this.rangementService.updateRangement(rangement).subscribe(() => {
        console.log(`Rangement ${rangement.nom} updated successfully.`);
      }, )
    
  } else {
    console.warn(`No rangements found for product with ID ${row.produitid}.`);
  }
}, (error) => {
  console.error(`Error getting rangements for product with ID ${row.produitid}: ${error}`);
});
}

})*/

      return ligne;
    });
    factureclient.total = this.totalPurchase; // Set the total

  
    // Call FactureclientService to save the invoice
    console.log(factureclient)
    this.factureclientService.addFactureclient(factureclient)
      .subscribe(() => {
        console.log('Invoice saved successfully.');
        this.factureclientService.getFactureclients().subscribe(factures => {
          const ticketNumber = factures.reduce((max, facture) => facture.numeroticket > max ? facture.numeroticket : max, 0) + 1;
          this.ticketNumber = ticketNumber;})
        // Reset the tableData array and other variables
        this.tickets = [];
        this.tableData = [];
        this.selectedClient = undefined;
        this.accountowner="";
        this.checkcompte="";
        this.amountPaid=0;
        this.totalTicketAmount=0;
      }, (error) => {
        console.error('Error saving invoice:', error);
      });
      console.log(factureclient)
      
  }
  
  addTicketresto(): void {
      const ticket = {
        typeticketrestoid:this.selectedTypeticket.id,
        code:this.ticketcode,
      };
      this.typeticketrestoService.getTypeticketresto(ticket.typeticketrestoid)
      .subscribe(typeticketresto => {
        this.typeticketrestoMap[ticket.typeticketrestoid] = typeticketresto;
      });
      
this.selectedTypeticket=undefined;
      this.ticketcode = "";

      this.tickets.push(ticket);
      console.log(ticket)
      this.calculateTotalTicketAmount(); // Calculate total

    
    
  }
  
  
  onDelete() {
    this.tableData = [];
    this.tickets = [];
    this.selectedClient = undefined;
        this.accountowner="";
        this.checkcompte="";
        this.amountPaid=0;
        this.totalTicketAmount=0;
  }


  deleteTicketresto(index: number): void {
    this.tickets.splice(index, 1);
    this.calculateTotalTicketAmount(); // Calculate total
  }
  
  calculateTotalTicketAmount(): void {
    let total = 0;
    this.tickets.forEach((ticket) => {
      const typeticket = this.typetickets.find(typeticket => typeticket.id === ticket.typeticketrestoid);
      if (typeticket) {
        total += typeticket.montant * typeticket.pourcentage / 100 ;
      }
    });
    this.totalTicketAmount = total;
  }
  











// save table data in local storage
saveTableData() {
  const tabledata = {
    name: this.tabledataname,
    data: this.tableData
  };
  console.log(tabledata)
  // Get table datas from local storage
  this.storedtabledatas = JSON.parse(localStorage.getItem('tabledatas'));
  if (!this.storedtabledatas) {
    this.storedtabledatas = []; // Initialize to an empty array
  }
  // Add new table data to the array
  this.storedtabledatas.push(tabledata);

  // Store table datas in local storage
  localStorage.setItem('tabledatas', JSON.stringify(this.storedtabledatas));
  console.log(this.storedtabledatas)
}


// get table data from local storage
getTableData() {

  // Get table datas from local storage
  console.log("this.selectedTableDataName=",this.selectedTableDataName)
  let tableDatas =  JSON.parse(localStorage.getItem('tabledatas')) ;

  // Find selected table data and return its data
  const selectedTableData = tableDatas.find(tableData => tableData.name == this.selectedTableDataName);
    this.tableData = selectedTableData.data;
  }

gettabledatas(){
  this.storedtabledatas = JSON.parse(localStorage.getItem('tabledatas'));

}



onCamerasFound(devices: MediaDeviceInfo[]): void {
  this.availableDevices = devices;
  this.hasDevices = Boolean(devices && devices.length);
}

onCodeResult(resultString: string) {
  this.qrResultString = resultString;
  this.barcodeInput.nativeElement.value = this.qrResultString;
  console.log(this.qrResultString)
  this.scanner=false;
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


printTicket() {
  const ticketHtml = `
    <div style="width: 200px; margin: 0 auto; border: 1px solid black; padding: 10px;">
      <div style="text-align: center; font-size: 16px; font-weight: bold;">MSK Store</div>
      <div style="text-align: center; font-size: 12px;">Tel: 51019923</div>
      <div style="text-align: center; font-size: 12px;">Date: ${new Date().toLocaleString('fr-FR', {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'})}</div>
      <div style="text-align: center; font-size: 12px;">Ticket n° ${this.ticketNumber}</div>

      <div style="text-align: center; font-size: 12px;">Caissier : ${this.cachier}</div>

      <div style="text-align: center; font-size: 12px;">timbre fiscal ${this.timbrefiscal.montant}</div>

      <hr>
      <div style="text-align: left; font-size: 12px; margin-top: 5px;">
          <div style="display: inline-block; width: 10%; text-align: left;">Qte</div>
          <div style="display: inline-block; width: 50%;">Article</div>
          <div style="display: inline-block; width: 15%; text-align: right;">Prix.U</div>
          <div style="display: inline-block; width: 15%; text-align: right;">Total</div>

        </div>
      ${this.tableData.map(row => `
        <div style="text-align: left; font-size: 12px; margin-top: 5px;">
          <div style="display: inline-block; width: 10%; text-align: left;">${row.quantity}  </div>
          <div style="display: inline-block; width: 50%;">${row.name}</div>
          <div style="display: inline-block; width: 15%; text-align: right;">${row.total}</div>
          <div style="display: inline-block; width: 15%; text-align: right;">${row.total*row.quantity}</div>

        </div>
      `).join('')}
      <hr>
      <div style="text-align: right; font-size: 12px; margin-top: 5px;">nombre d'article: ${this.tableData.length}</div>
      <div style="text-align: right; font-size: 12px; margin-top: 5px;">Total Ticket: ${this.totalPurchase}</div>
     


      <div style="text-align: center; font-size: 12px; margin-top: 10px;">Merci de votre visite!</div>
    </div>
  `;

  // Open new window
  let printWindow = window.open('', 'PrintWindow', 'height=600,width=700');

  // Write contents to the new window
  printWindow.document.write('<html><head><title>Ticket de Magasin</title></head><body>' + ticketHtml + '</body></html>');

  // Call the print() on the new window
  printWindow.print();
}
}

