import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DevisModule } from 'app/module/devis.module';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DevisService {
  private devisUrl = `${environment.apiUrl}/api/Devis`;
 
  constructor(private http: HttpClient) { }
  getDeviss(): Observable<DevisModule[]> {
    return this.http.get<DevisModule[]>(this.devisUrl);
  }

  getDevis(id: number): Observable<DevisModule> {
    return this.http.get<DevisModule>(`${this.devisUrl}/${id}`);
  }

  addDevis(commandefournisseur: DevisModule): Observable<DevisModule> {
    return this.http.post<DevisModule>(this.devisUrl, commandefournisseur);
  }

  updateDevis(commandefournisseur: DevisModule): Observable<DevisModule> {
    return this.http.put<DevisModule>(`${this.devisUrl}/${commandefournisseur.id}`, commandefournisseur);
  }

  deleteDevis(id: number): Observable<void> {
    return this.http.delete<void>(`${this.devisUrl}/${id}`);
  } 
}
