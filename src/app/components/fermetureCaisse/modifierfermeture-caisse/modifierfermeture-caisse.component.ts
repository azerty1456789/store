import { Component, OnInit } from '@angular/core';
import { FermeturecaisseModule } from 'app/module/fermeturecaisse.module';
import { ActivatedRoute,Router } from '@angular/router';
import { FermeturecaisseService } from 'app/service/fermeturecaisse/fermeturecaisse.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-modifierfermeture-caisse',
  templateUrl: './modifierfermeture-caisse.component.html',
  styleUrls: ['./modifierfermeture-caisse.component.scss']
})
export class ModifierfermetureCaisseComponent implements OnInit {
  fermeturecaisseId: number;
  Fermeturecaisse: FermeturecaisseModule;
  totalcash: number;
  totalcheck: number;
  totalticketresto: number;
  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private fermeturecaisseService:FermeturecaisseService,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

  ngOnInit(): void { 
    this.route.paramMap.subscribe(params => {
    this.fermeturecaisseId = +params.get('id');
    this.fermeturecaisseService.getFermeturecaisse(this.fermeturecaisseId).subscribe(Fermeturecaisse => {
      this.Fermeturecaisse = Fermeturecaisse;
      this.totalcash=Fermeturecaisse.totalcash
      this.totalcheck=Fermeturecaisse.totalcheck
      this.totalticketresto=Fermeturecaisse.totalticketresto
    });
  });
    
  }
  onSubmit() {
    this.totalcash-=this.Fermeturecaisse.totalcash
    this.totalcheck-=this.Fermeturecaisse.totalcheck
    this.totalticketresto-=this.Fermeturecaisse.totalticketresto  
this.Fermeturecaisse.ecartcash+=this.totalcash
this.Fermeturecaisse.ecartcheck+=this.totalcheck
this.Fermeturecaisse.ecartticketresto+=this.totalticketresto

    this.fermeturecaisseService.updateFermeturecaisse(this.Fermeturecaisse).subscribe(
      (response) => {
        console.log(response);
        // show a success message
        alert('fermeturecaisse updated successfully!');
        this.router.navigate(['/fermeturecaisse/lister']);
      },
      (error) => {
        console.log(error);
        // show an error message
        alert('Error updating fermeturecaisse!');
      }
    );
  }

}
