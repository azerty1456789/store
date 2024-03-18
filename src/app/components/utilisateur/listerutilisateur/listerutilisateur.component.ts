import { Component, OnInit } from '@angular/core';
import { UtilisateurModule } from 'app/module/utilisateur.module';
import { UserService } from 'app/auth/service/user.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-listerutilisateur',
  templateUrl: './listerutilisateur.component.html',
  styleUrls: ['./listerutilisateur.component.scss']
})
export class ListerutilisateurComponent implements OnInit {
  users: UtilisateurModule[] ;
  totalUsers: number;
  pageSize = 5;
  currentPage = 1;

  constructor(private userService: UserService,private _translateService: CoreTranslationService) {
    this._translateService.translate(english, french, arabic);

  }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
        this.totalUsers = users.length;

      });
  }
  
  paginate(event) {
    this.pageSize = event.target.value;
    this.currentPage = 1;
  }
  pageChanged(event) {
    this.currentPage = event;
  }
}


