import { Component, OnInit } from '@angular/core';
import { UtilisateurModule } from 'app/module/utilisateur.module';
import { UserService } from 'app/auth/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'

@Component({
  selector: 'app-afficherutilisateur',
  templateUrl: './afficherutilisateur.component.html',
  styleUrls: ['./afficherutilisateur.component.scss']
})
export class AfficherutilisateurComponent implements OnInit {
  userId: number;
  user: UtilisateurModule;
  salePermission: boolean = false;
  depositPermission: boolean = false;
  providerPermission: boolean = false;
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router,private _translateService: CoreTranslationService) {
    this._translateService.translate(english, french, arabic);
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('id');
      this.userService.getUser(this.userId).subscribe(user => {
        this.user = user;
        if (this.user.permission & 1) {
          this.salePermission = true;
        }
        if (this.user.permission & 2) {
          this.depositPermission = true;
        }
        if (this.user.permission & 4) {
          this.providerPermission = true;
        }
      });
    });
  }
  onModify(): void {
    this.router.navigate(['/modifierutilisateur', this.user.id]);
  }
  onDelete(): void {
    this.userService.deleteUser(this.user.id)
    
      .subscribe(() => {
        alert(' user deleted!');
        this.router.navigate(['/utilisateur/lister']);
      });
  }
}



