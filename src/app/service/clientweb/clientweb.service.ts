import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ClientwebModule } from 'app/module/clientweb.module';

@Injectable({
  providedIn: 'root'
})
export class ClientwebService {

  private clientwebsUrl = `${environment.apiUrl}/api/Clientwebs`;
  constructor(private http: HttpClient) { }

  getClientwebs(): Observable<ClientwebModule[]> {
    return this.http.get<ClientwebModule[]>(this.clientwebsUrl);
  }

  getClientweb(id: number): Observable<ClientwebModule> {
    const url = `${this.clientwebsUrl}/${id}`;
    return this.http.get<ClientwebModule>(url);
  }

  addClientweb(client: ClientwebModule): Observable<ClientwebModule> {
    return this.http.post<ClientwebModule>(this.clientwebsUrl, client);
  }

  
  updateClientweb(client: ClientwebModule): Observable<ClientwebModule> {
    const url = `${this.clientwebsUrl}/${client.id}`; 
    return this.http.put<ClientwebModule>(url, client);
  }

  deleteClientweb(id: number): Observable<ClientwebModule> {
    const url = `${this.clientwebsUrl}/${id}`;
    return this.http.delete<ClientwebModule>(url);
  }
  
  
}
