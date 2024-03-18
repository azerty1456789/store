import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { FournisseurModule } from 'app/module/fournisseur.module';
@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  private apiUrl = `${environment.apiUrl}/api/Fournisseurs`;

  constructor(private http: HttpClient) { }

  getFournisseurs(): Observable<FournisseurModule[]> {
    return this.http.get<FournisseurModule[]>(this.apiUrl);
  }

  getFournisseur(id: number): Observable<FournisseurModule> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<FournisseurModule>(url);
  }

  addFournisseur(fournisseur: FournisseurModule): Observable<FournisseurModule> {
    return this.http.post<FournisseurModule>(this.apiUrl, fournisseur);
  }

  updateFournisseur(fournisseur: FournisseurModule): Observable<FournisseurModule> {
    const url = `${this.apiUrl}/${fournisseur.id}`; 
    return this.http.put<FournisseurModule>(url, fournisseur);
  }

  deleteFournisseur(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
