import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeticketrestoModule } from 'app/module/typeticketresto.module';
import { TypeticketrestoService } from 'app/service/typeticketresto/typeticketresto.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-affichertypeticketresto',
  templateUrl: './affichertypeticketresto.component.html',
  styleUrls: ['./affichertypeticketresto.component.scss']
})
export class AffichertypeticketrestoComponent implements OnInit {
  typeTicketResto:TypeticketrestoModule;
  constructor(
    private typeticketrestoService:TypeticketrestoService,
    private route: ActivatedRoute,
    private router: Router,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
this.typeticketrestoService.getTypeticketresto(id)
.subscribe(typeTicketResto=>this.typeTicketResto=typeTicketResto);
  }
  onModify(): void {
    this.router.navigate(['/modifiertypeticketresto', this.typeTicketResto.id]);
  }

  onDelete(): void {
    this.typeticketrestoService.deleteTypeticketresto(this.typeTicketResto.id)
    
      .subscribe(() => {
        alert(' Type Ticket Resto deleted!');
        this.router.navigate(['/typeticketresto/lister']);
      });
}
}
