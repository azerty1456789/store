import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FermeturecaisseModule } from 'app/module/fermeturecaisse.module';
import { FermeturecaisseService } from 'app/service/fermeturecaisse/fermeturecaisse.service';
import { UserService } from 'app/auth/service/user.service';
import { User } from 'app/auth/models';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-afficherfermeture-caisse',
  templateUrl: './afficherfermeture-caisse.component.html',
  styleUrls: ['./afficherfermeture-caisse.component.scss']
})
export class AfficherfermetureCaisseComponent implements OnInit {
  fermeturecaisse:FermeturecaisseModule;
  username:string;
  constructor(private fermeturecaisseService:FermeturecaisseService,
    private userService:UserService,
    private route: ActivatedRoute,
      private router: Router,
      private _translateService: CoreTranslationService) {
        this._translateService.translate(english, french, arabic);
  
       }

      ngOnInit(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.fermeturecaisseService.getFermeturecaisse(id)
          .subscribe(fermeturecaisse => {
            this.fermeturecaisse = fermeturecaisse;
            this.userService.getUser(this.fermeturecaisse?.idemployee)
              .subscribe((user: User) => {
                this.username = user.name;
              });
          });
      }
  onModify(): void {
    this.router.navigate(['/modifierfermeturecaisse', this.fermeturecaisse.id]);
  }

  onDelete(): void {
    this.fermeturecaisseService.deleteFermeturecaisse(this.fermeturecaisse.id)
    
      .subscribe(() => {
        alert(' Fermeture caisse deleted!');
        this.router.navigate(['/fermeturecaisse/lister']);
      });
  }

}
