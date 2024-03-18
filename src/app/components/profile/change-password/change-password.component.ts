import { Component, OnInit,  } from '@angular/core';
import { UserService } from 'app/auth/service/user.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  
  currentPassword: string;
  newPassword: string;
  constructor(private userService:UserService,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

  ngOnInit(): void {
  }
  onModify() {
    
  
    this.userService.updatePassword(this.currentPassword, this.newPassword).subscribe(
      () => alert('Password updated successfully.'),
      error => alert( error)
    );
  }
  
  }

