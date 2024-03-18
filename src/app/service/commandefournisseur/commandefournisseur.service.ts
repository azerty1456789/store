import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommandefournisseurModule } from 'app/module/commandefournisseur.module';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CommandefournisseurService {
  private commandefournisseurUrl = `${environment.apiUrl}/api/Commandefournisseurs`;

  constructor(private http: HttpClient) { }
  getCommandefournisseurs(): Observable<CommandefournisseurModule[]> {
    return this.http.get<CommandefournisseurModule[]>(this.commandefournisseurUrl);
  }

  getCommandefournisseur(id: number): Observable<CommandefournisseurModule> {
    return this.http.get<CommandefournisseurModule>(`${this.commandefournisseurUrl}/${id}`);
  }

  addCommandefournisseur(commandefournisseur: CommandefournisseurModule): Observable<CommandefournisseurModule> {
    return this.http.post<CommandefournisseurModule>(this.commandefournisseurUrl, commandefournisseur);
  }

  updateCommandefournisseur(commandefournisseur: CommandefournisseurModule): Observable<CommandefournisseurModule> {
    return this.http.put<CommandefournisseurModule>(`${this.commandefournisseurUrl}/${commandefournisseur.id}`, commandefournisseur);
  }

  deleteCommandefournisseur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.commandefournisseurUrl}/${id}`);
  } 
}
