import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'environments/environment';
import { User } from 'app/auth/models';
import { UtilisateurModule } from 'app/module/utilisateur.module';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  /**
   *
   * @param {HttpClient} _http
   */
  constructor(private _http: HttpClient, private authenticationService: AuthenticationService) {}

  /**
   * Get all users
   */
  getUsers() {
    return this._http.get<User[]>(`${environment.apiUrl}/Users`);
  }

  /**
   * Get user by id
   */
  getUser(id: number) {
    return this._http.get<User>(`${environment.apiUrl}/Users/${id}`).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(error);
      }),
      tap((response) => console.log(response))
    );
  }




  getMe(): Observable<User> {
    return this._http.get<User>(`${environment.apiUrl}/Users/me`).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(error);
      }),
      tap((response) => console.log(response))
    );
  }

  updatePassword(currentPassword: string, newPassword: string): Observable<any> {
    const body = {
      currentPassword,
      newPassword
    };
    return this._http.put(`${environment.apiUrl}/Users/me`, body).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(error);
      }),
      tap((response) => console.log(response))
    );
  }

  addUser(user: UtilisateurModule): Observable<UtilisateurModule> {
    return this._http.post<UtilisateurModule>(`${environment.apiUrl}/Users`, user).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(error);
      }),
      tap((response) => console.log(response))
    );
  }

  deleteUser(id: number): Observable<UtilisateurModule> {
    return this._http.delete<UtilisateurModule>(`${environment.apiUrl}/Users/${id}`);
  }
 
  
  updateUser(user: UtilisateurModule) {
    return this._http.put<User>(`${environment.apiUrl}/users/${user.id}`, user);
  }
}
