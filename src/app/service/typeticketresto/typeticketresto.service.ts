import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TypeticketrestoModule } from 'app/module/typeticketresto.module';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeticketrestoService {
private TypeticketrestoesUrl = `${environment.apiUrl}/api/Typeticketrestoes`
  constructor(private http: HttpClient) { }
  getTypeticketrestoes(): Observable<TypeticketrestoModule[]> {
    return this.http.get<TypeticketrestoModule[]>(this.TypeticketrestoesUrl);
  }

  getTypeticketresto(id: number): Observable<TypeticketrestoModule> {
    const url = `${this.TypeticketrestoesUrl}/${id}`;
    return this.http.get<TypeticketrestoModule>(url);
  }

  addTypeticketresto(typeticketresto: TypeticketrestoModule): Observable<TypeticketrestoModule> {
    return this.http.post<TypeticketrestoModule>(this.TypeticketrestoesUrl, typeticketresto);
  }

  updateTypeticketresto(typeticketresto: TypeticketrestoModule): Observable<any> {
    const url = `${this.TypeticketrestoesUrl}/${typeticketresto.id}`;
    return this.http.put(url, typeticketresto);
  }

  deleteTypeticketresto(id: number): Observable<any> {
    const url = `${this.TypeticketrestoesUrl}/${id}`;
    return this.http.delete(url);
  }
}
