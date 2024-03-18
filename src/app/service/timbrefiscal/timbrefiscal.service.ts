import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { TimbrefiscalModule } from 'app/module/timbrefiscal.module';
@Injectable({
  providedIn: 'root'
})
export class TimbrefiscalService {
  private TimbrefiscalUrl = `${environment.apiUrl}/api/Timbrefiscals`;

  constructor(private http: HttpClient) { }
  getTimbrefiscals(): Observable<TimbrefiscalModule[]> {
    return this.http.get<TimbrefiscalModule[]>(this.TimbrefiscalUrl);
  }

  getTimbrefiscal(id: number): Observable<TimbrefiscalModule> {
    const url = `${this.TimbrefiscalUrl}/${id}`;
    return this.http.get<TimbrefiscalModule>(url);
  }

  addTimbrefiscal(timbrefiscal: TimbrefiscalModule): Observable<TimbrefiscalModule> {
    return this.http.post<TimbrefiscalModule>(this.TimbrefiscalUrl, timbrefiscal);
  }

  
  updateTimbrefiscal(timbrefiscal: TimbrefiscalModule): Observable<TimbrefiscalModule> {
    const url = `${this.TimbrefiscalUrl}/${timbrefiscal.id}`; 
    return this.http.put<TimbrefiscalModule>(url, timbrefiscal);
  }

  deleteTimbrefiscal(id: number): Observable<TimbrefiscalModule> {
    const url = `${this.TimbrefiscalUrl}/${id}`;
    return this.http.delete<TimbrefiscalModule>(url);
  }
}
