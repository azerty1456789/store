import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { TypeticketrestoModule } from 'app/module/typeticketresto.module';
import { TypeticketrestoService } from 'app/service/typeticketresto/typeticketresto.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-modifiertypeticketresto',
  templateUrl: './modifiertypeticketresto.component.html',
  styleUrls: ['./modifiertypeticketresto.component.scss']
})
export class ModifiertypeticketrestoComponent implements OnInit {
  TypeTicketResto:TypeticketrestoModule;
  TypeTicketRestoId:number;
  pourcentage:number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private typeticketrestoService:TypeticketrestoService,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.TypeTicketRestoId= +params.get('id');
      this.typeticketrestoService.getTypeticketresto(this.TypeTicketRestoId).subscribe(TypeTicketResto => {
        this.TypeTicketResto = TypeTicketResto;
        this.pourcentage=100-TypeTicketResto.pourcentage
      });
    });
  }
  onSubmit() {
    this.TypeTicketResto.pourcentage = 100 - this.pourcentage; 
    this.typeticketrestoService.updateTypeticketresto(this.TypeTicketResto).subscribe(
      (response) => {
        console.log(response);
        // show a success message
        alert('Type Ticket Resto updated successfully!');
        this.router.navigate(['/typeticketresto/lister']);
      },
      (error) => {
        console.log(error);
        // show an error message
        alert('Error updating Type Ticket Resto!');
      }
    );
  }

}
