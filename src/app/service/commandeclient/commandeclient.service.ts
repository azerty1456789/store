import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommandeclientModule } from 'app/module/commandeclient.module';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CommandeclientService {

  private commandeclientUrl = `${environment.apiUrl}/api/Commandeclients`;

  constructor(private http: HttpClient) { }
  getCommandeclients(): Observable<CommandeclientModule[]> {
    return this.http.get<CommandeclientModule[]>(this.commandeclientUrl);
  }

  getCommandeclient(id: number): Observable<CommandeclientModule> {
    return this.http.get<CommandeclientModule>(`${this.commandeclientUrl}/${id}`);
  }

  addCommandeclient(commandeclient: CommandeclientModule): Observable<CommandeclientModule> {
    return this.http.post<CommandeclientModule>(this.commandeclientUrl, commandeclient);
  }

  updateCommandeclient(commandeclient: CommandeclientModule): Observable<CommandeclientModule> {
    return this.http.put<CommandeclientModule>(`${this.commandeclientUrl}/${commandeclient.id}`, commandeclient);
  }

  deleteCommandeclient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.commandeclientUrl}/${id}`);
  }}
