import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

import { ClientModule } from '../../module/client.module';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  //private clientsUrl = 'https://localhost:7258/api/Clients';
  private clientsUrl = `${environment.apiUrl}/api/Clients`;
  constructor(private http: HttpClient) { }

  getClients(): Observable<ClientModule[]> {
    return this.http.get<ClientModule[]>(this.clientsUrl);
  }

  getClient(id: number): Observable<ClientModule> {
    const url = `${this.clientsUrl}/${id}`;
    return this.http.get<ClientModule>(url);
  }

  addClient(client: ClientModule): Observable<ClientModule> {
    return this.http.post<ClientModule>(this.clientsUrl, client);
  }

  
  updateClient(client: ClientModule): Observable<ClientModule> {
    const url = `${this.clientsUrl}/${client.id}`; 
    return this.http.put<ClientModule>(url, client);
  }

  deleteClient(id: number): Observable<ClientModule> {
    const url = `${this.clientsUrl}/${id}`;
    return this.http.delete<ClientModule>(url);
  }
  updateCredit(clientId: number, xcredit: number): Observable<any> {
    const url = `${this.clientsUrl}/clients/${clientId}/xcredit`;
    return this.http.put(url, xcredit);
  }
  
}
