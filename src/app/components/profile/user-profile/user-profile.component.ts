import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/auth/service/authentication.service';
import { User } from 'app/auth/models';
import { UserService } from 'app/auth/service/user.service';
import {  Router } from '@angular/router';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  currentUser: User;

  constructor(private authenticationService: AuthenticationService, private userService: UserService, private router: Router,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

  ngOnInit() {
  this.authenticationService.currentUser.subscribe(user => {
    this.currentUser = user;
    if (user) {
      this.userService.getMe().subscribe(res => {
        this.currentUser = res;
      });
    }
  });
}

onModify(): void {
  this.router.navigate(['/modifier-password']);
}

}






 