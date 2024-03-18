import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ColonneModule } from 'app/module/colonne.module';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ColonneService {
  //private colonnesUrl = 'https://localhost:7258/api/Colonnes';
  private colonnesUrl = `${environment.apiUrl}/api/Colonnes`;

  constructor(private http: HttpClient) { }

  getColonnes(): Observable<ColonneModule[]> {
    return this.http.get<ColonneModule[]>(this.colonnesUrl);
  }

  getColonne(id: number): Observable<ColonneModule> {
    const url = `${this.colonnesUrl}/${id}`;
    return this.http.get<ColonneModule>(url);
  }

  addColonne(colonne: ColonneModule): Observable<ColonneModule> {
    return this.http.post<ColonneModule>(this.colonnesUrl, colonne);
  }

  updateColonne(colonne: ColonneModule): Observable<any> {
    const url = `${this.colonnesUrl}/${colonne.id}`;
    return this.http.put(url, colonne);
  }

  deleteColonne(id: number): Observable<any> {
    const url = `${this.colonnesUrl}/${id}`;
    return this.http.delete(url);
  }
  getColonnesByDepotId(depotId: number): Observable<ColonneModule[]> {
    const url = `${this.colonnesUrl}/depot/${depotId}`;
    return this.http.get<ColonneModule[]>(url);
  }
  
}
