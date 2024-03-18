import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DepotModule } from 'app/module/depot.module';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepotService {
  //private depotsUrl = 'https://localhost:7258/api/Depots';
  private depotsUrl = `${environment.apiUrl}/api/Depots`;

  constructor(private http: HttpClient) { }

  getDepots(): Observable<DepotModule[]> {
    return this.http.get<DepotModule[]>(this.depotsUrl);
  }
  getDepot(id: number): Observable<DepotModule> {
    const url = `${this.depotsUrl}/${id}`;
    return this.http.get<DepotModule>(url);
  }
  addDepot(depot: DepotModule): Observable<DepotModule> {
    return this.http.post<DepotModule>(this.depotsUrl, depot);
  }
  updateDepot(depot: DepotModule): Observable<any> {
    const url = `${this.depotsUrl}/${depot.id}`;
    return this.http.put(url, depot);
  }
  deleteDepot(id: number): Observable<any> {
    const url = `${this.depotsUrl}/${id}`;
    return this.http.delete(url);
  }
}
