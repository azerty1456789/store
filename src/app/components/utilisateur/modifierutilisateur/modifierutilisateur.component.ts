import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

import { UtilisateurModule } from 'app/module/utilisateur.module';
import { UserService } from 'app/auth/service/user.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-modifierutilisateur',
  templateUrl: './modifierutilisateur.component.html',
  styleUrls: ['./modifierutilisateur.component.scss']
})
export class ModifierutilisateurComponent implements OnInit {
  userId: number;
  user: UtilisateurModule;
  salePermission: boolean ;
  depositPermission: boolean ;
  providerPermission: boolean ;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private _translateService: CoreTranslationService) {
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
  
    onSubmit() {
      let permissionValue = 0;
  if (this.salePermission) {
    permissionValue += 1;
  }
  if (this.depositPermission) {
    permissionValue += 2;
  }
  if (this.providerPermission) {
    permissionValue += 4;
  }
  this.user.permission = permissionValue;

      this.userService.updateUser(this.user).subscribe(
        (response) => {
          console.log(response);
          // show a success message
          alert('user updated successfully!');
          this.router.navigate(['/utilisateur/lister']);
        },
        (error) => {
          console.log(error);
          // show an error message
          alert('Error updating user!');
        }
      );
    }
  

}

