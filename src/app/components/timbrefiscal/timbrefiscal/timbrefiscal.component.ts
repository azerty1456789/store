import { Component, OnInit } from '@angular/core';
import { TimbrefiscalModule } from 'app/module/timbrefiscal.module';
import { TimbrefiscalService } from 'app/service/timbrefiscal/timbrefiscal.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-timbrefiscal',
  templateUrl: './timbrefiscal.component.html',
  styleUrls: ['./timbrefiscal.component.scss']
})
export class TimbrefiscalComponent implements OnInit {
timbrefiscal:TimbrefiscalModule
  constructor(private timbrefiscalService:TimbrefiscalService,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

  ngOnInit(): void {
this.timbrefiscalService.getTimbrefiscal(1).subscribe(

  (timbrefiscal) => {
    this.timbrefiscal=timbrefiscal

  },
  () => {
    const newTimbrefiscal = new TimbrefiscalModule();

this.timbrefiscalService.addTimbrefiscal(newTimbrefiscal).subscribe(timbrefiscal=>this.timbrefiscal=timbrefiscal)
  }
);
  }
  onSubmit(){
    this.timbrefiscalService.updateTimbrefiscal(this.timbrefiscal).subscribe(
      (response) => {
        console.log(response);
        alert('timbre fiscal updated successfully!');
      },
      (error) => {
        console.log(error);
        alert('Error updating timbre fiscal!');
      }
    );
  }
}
