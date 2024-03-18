import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FactureclientModule } from 'app/module/factureclient.module';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FactureclientService {
  //private factureclientUrl = 'https://localhost:7258/api/Factureclients';
  private factureclientUrl = `${environment.apiUrl}/api/Factureclients`;

  constructor(private http: HttpClient) { }
  getFactureclients(): Observable<FactureclientModule[]> {
    return this.http.get<FactureclientModule[]>(this.factureclientUrl);
  }
  getLastFacturesByUser(userId: number, id: number): Observable<FactureclientModule[]> {
    const url = `${this.factureclientUrl}?userId=${userId}&id=${id}`;
    return this.http.get<FactureclientModule[]>(url);
}
  getFactureclient(id: number): Observable<FactureclientModule> {
    const url = `${this.factureclientUrl}/${id}`;
    return this.http.get<FactureclientModule>(url);
  }



  addFactureclient(factureclient: FactureclientModule): Observable<FactureclientModule> {
    return this.http.post<FactureclientModule>(this.factureclientUrl, factureclient);
  }

  updateFactureclient(factureclient: FactureclientModule): Observable<FactureclientModule> {
    const url = `${this.factureclientUrl}/${factureclient.id}`;
    return this.http.put<FactureclientModule>(url, factureclient);
  }

  deleteFactureclient(id: number): Observable<any> {
    const url = `${this.factureclientUrl}/${id}`;
    return this.http.delete(url);
  }

  getFacturesByClientId(clientId: number): Observable<FactureclientModule[]> {
    const url = `${this.factureclientUrl}/client/${clientId}`;
    return this.http.get<FactureclientModule[]>(url);
  }
  getFacturesByDateRange(fromDate: Date, toDate: Date): Observable<FactureclientModule[]> {
    const url = `${this.factureclientUrl}/${fromDate.toISOString()}/${toDate.toISOString()}`;
    return this.http.get<FactureclientModule[]>(url);
  }
}
