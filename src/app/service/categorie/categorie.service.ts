import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

import { CategorieModule } from '../../module/categorie.module';
import { switchMap } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class CategorieService {
//  private categoriesUrl = 'https://localhost:7258/api/Categories';
  private categoriesUrl = `${environment.apiUrl}/api/Categories`;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<CategorieModule[]> {
    return this.http.get<CategorieModule[]>(this.categoriesUrl);
  }

  getCategorie(id: number): Observable<CategorieModule> {
    const url = `${this.categoriesUrl}/${id}`;
    return this.http.get<CategorieModule>(url);
  }

  getParentCategorie(id: number): Observable<CategorieModule> {
    const childUrl = `${this.categoriesUrl}/${id}`;
    return this.http.get<CategorieModule>(childUrl).pipe(
      switchMap((child: CategorieModule) => {
        const parentUrl = `${this.categoriesUrl}/${child.parentid}`;
        return this.http.get<CategorieModule>(parentUrl);
      })
    );
  }

  addCategorie(categorie: CategorieModule): Observable<CategorieModule> {
    return this.http.post<CategorieModule>(this.categoriesUrl, categorie);
  }

  updateCategorie(categorie: CategorieModule): Observable<CategorieModule> {
    const url = `${this.categoriesUrl}/${categorie.id}`; 
    return this.http.put<CategorieModule>(url, categorie);
  }

  deleteCategorie(id: number): Observable<CategorieModule> {
    const url = `${this.categoriesUrl}/${id}`;
    return this.http.delete<CategorieModule>(url);
  }
}