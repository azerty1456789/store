import { Component, OnInit } from '@angular/core';
import { CommandeclientModule } from 'app/module/commandeclient.module';
import { CommandeclientService } from 'app/service/commandeclient/commandeclient.service';
import { ClientwebModule } from 'app/module/clientweb.module';
import { ClientwebService } from 'app/service/clientweb/clientweb.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'

@Component({
  selector: 'app-listercommandeclient',
  templateUrl: './listercommandeclient.component.html',
  styleUrls: ['./listercommandeclient.component.scss']
})
export class ListercommandeclientComponent implements OnInit {
commandeclients:CommandeclientModule[];
pageSize = 5;
    currentPage = 1;
    clientwebs:ClientwebModule[];
  constructor(private commandeclientService:CommandeclientService,
    private clientwebService:ClientwebService,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

  ngOnInit(): void {
    this.getCommandeclients();
      this.getclientwebs();
  }
  getCommandeclients():void{
    this.commandeclientService.getCommandeclients()
    .subscribe(commandeclients=>this.commandeclients=commandeclients)
      }
      getclientwebs():void{
        this.clientwebService.getClientwebs().subscribe(clientwebs=>this.clientwebs=clientwebs)
      }
      getclientwebName(id: number): string {
        if (this.clientwebs) {
       
        const clientweb = this.clientwebs.find(f => f.id === id);
        return clientweb ? clientweb.nom : ''; }
    }
    paginate(event) {
      this.pageSize = event.target.value;
      this.currentPage = 1;
    }
    pageChanged(event) {
      this.currentPage = event;
    }
}
