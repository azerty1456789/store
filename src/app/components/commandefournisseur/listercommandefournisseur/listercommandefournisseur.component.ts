import { Component, OnInit } from '@angular/core';
import { CommandefournisseurModule } from 'app/module/commandefournisseur.module';
import { CommandefournisseurService } from 'app/service/commandefournisseur/commandefournisseur.service';
import { FournisseurModule } from 'app/module/fournisseur.module';
import { FournisseurService } from 'app/service/fournisseur/fournisseur.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-listercommandefournisseur',
  templateUrl: './listercommandefournisseur.component.html',
  styleUrls: ['./listercommandefournisseur.component.scss']
})
export class ListercommandefournisseurComponent implements OnInit {
  commandefournisseurs:CommandefournisseurModule[];
  pageSize = 5;
    currentPage = 1;
    fournisseurs: FournisseurModule[];
  constructor(private commandefournisseurService:CommandefournisseurService,
    private fournisseurService:FournisseurService,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }


    ngOnInit(): void {
      this.getCommandefournisseurs();
      this.getfournisseurs();
    }
  
    getCommandefournisseurs():void{
  this.commandefournisseurService.getCommandefournisseurs()
  .subscribe(commandefournisseurs=>this.commandefournisseurs=commandefournisseurs)
    }
    getfournisseurs():void{
      this.fournisseurService.getFournisseurs().subscribe(fournisseurs=>this.fournisseurs=fournisseurs)
    }
    getFournisseurName(id: number): string {
      if (this.fournisseurs) {
     
      const fournisseur = this.fournisseurs.find(f => f.id === id);
      return fournisseur ? fournisseur.nom : ''; }
  }
  
    paginate(event) {
      this.pageSize = event.target.value;
      this.currentPage = 1;
    }
    pageChanged(event) {
      this.currentPage = event;
    }
}







