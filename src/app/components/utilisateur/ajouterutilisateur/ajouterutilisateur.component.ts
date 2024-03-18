import { Component, OnInit } from '@angular/core';
import { UtilisateurModule } from 'app/module/utilisateur.module';
import { UserService } from 'app/auth/service/user.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-ajouterutilisateur',
  templateUrl: './ajouterutilisateur.component.html',
  styleUrls: ['./ajouterutilisateur.component.scss']
})
export class AjouterutilisateurComponent implements OnInit {
  salePermission: boolean = false;
  depositPermission: boolean = false;
  providerPermission: boolean = false;
  permissionValue: number = 0; 
  passwordTextType = true;

  
  newUser: UtilisateurModule = {
    id: 0,
    email: "",
    password: "",
    name: '',
    lastName: '',
    phone: null,
    role: '',
    cin: null,
    typecontrat: '',
    salaire: null,
    salairebrut: null,
    permission: 0,
    photo: '',
    token: '0',
  };
  
  constructor(private userService: UserService,private _translateService: CoreTranslationService) {
    this._translateService.translate(english, french, arabic);

  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.newUser.email) {
      alert('Please enter an email ');
      return;
    }
    const emailRegex = /\S+@\S+\.\S+/;

if (!emailRegex.test(this.newUser.email)) {
  alert('Please enter a valid email ');
  return;
}
    if (!this.newUser.password) {
      alert('Please enter a password');
      return;
    }
    if (!this.newUser.role) {
      alert('Please select a role');
      return;
    }
    if (this.newUser.role === 'Employee') {
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
      this.newUser.permission = permissionValue;
    }

    this.userService.addUser(this.newUser).subscribe(
      (response) => {
        console.log(response);
        // clear the form and show a success message
        this.newUser = {
          id: 0,
          email: null,
          password: null,
          name: '',
          lastName: '',
          phone: null,
          role: '',
          cin: null,
          typecontrat: '',
          salaire: null,
          salairebrut: null,
          permission: 0,
          photo: '',
          token: '0'
        };
        alert('New User added successfully!');
      },
      (error) => {
        console.log(error);
       alert(error);
      }
    );
  }

}