import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

import { FermeturecaisseModule } from 'app/module/fermeturecaisse.module';

@Injectable({
  providedIn: 'root'
})
export class FermeturecaisseService {
  private apiUrl = `${environment.apiUrl}/api/Fermeturecaisses`;

  constructor(private http: HttpClient) { }
  getFermeturecaisses(): Observable<FermeturecaisseModule[]> {
    return this.http.get<FermeturecaisseModule[]>(this.apiUrl);
  }

  getFermeturecaisse(id: number): Observable<FermeturecaisseModule> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<FermeturecaisseModule>(url);
  }
  getlastFermeturecaisseByUser(userId: number): Observable<FermeturecaisseModule> {
    const url = `${this.apiUrl}/lastbyuser/${userId}`;
    return this.http.get<FermeturecaisseModule>(url);
}
  addFermeturecaisse(fermeturecaisse: FermeturecaisseModule): Observable<FermeturecaisseModule> {
    return this.http.post<FermeturecaisseModule>(this.apiUrl, fermeturecaisse);
  }

  updateFermeturecaisse(fermeturecaisse: FermeturecaisseModule): Observable<FermeturecaisseModule> {
    const url = `${this.apiUrl}/${fermeturecaisse.id}`;
    return this.http.put<FermeturecaisseModule>(url, fermeturecaisse);
  }

  deleteFermeturecaisse(id: number): Observable<FermeturecaisseModule> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<FermeturecaisseModule>(url);
  }
}
