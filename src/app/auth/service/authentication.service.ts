import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { User } from 'app/auth/models';
import jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
 // private authsUrl = 'https://localhost:7258/Users/authenticate';
  private authsUrl = `${environment.apiUrl}/Users/authenticate`;

  //public
  public currentUser: Observable<User>;

  //private
  private currentUserSubject: BehaviorSubject<User>;

  /**
   *
   * @param {HttpClient} _http
   */
  constructor(private _http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   *  Confirms if user is admin
   */
  get isAdmin() {
    return this.currentUser && this.currentUserSubject.value.role === "Admin";
  }

  /**
   *  Confirms if user is employee
   */
  get isEmployee() {
    return this.currentUser && this.currentUserSubject.value.role === "Employee";
  }

  /**
   * User login
   *
   * @param email
   * @param password
   * @returns user
   */
  
  login(authemail: string, authpassword: string): Observable<any> {
    return this._http.post<{ token: string }>(`${this.authsUrl}`, { authemail, authpassword })
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(error);
        }),
        tap((response) => {
          if (response && response.token) {
            const user = jwt_decode(response.token) as User;
            user.token = response.token; // Add token to User object
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
        })
      );
  }
  
  

  /**
   * User logout 
   *
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.clear();

   // notify
    this.currentUserSubject.next(null);
  }

  /**
   * Get user by id
   * @param id user id
   * @returns user
   */
  getUserById(id: string) {
    return this._http.get<User>(`${environment.apiUrl}/users/${id}`);
  }


  
}