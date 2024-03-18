import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RangementModule } from 'app/module/rangement.module';
import { ColonneModule } from 'app/module/colonne.module';
import { ColonneService } from '../colonne/colonne.service';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RangementService {
  //private rangementsUrl = 'https://localhost:7258/api/Rangements';
  private rangementsUrl = `${environment.apiUrl}/api/Rangements`;

  constructor(private http: HttpClient,
    private colonneService:ColonneService
    ) { }

  getRangements(): Observable<RangementModule[]> {
    return this.http.get<RangementModule[]>(this.rangementsUrl);
  }

  getRangement(id: number): Observable<RangementModule> {
    const url = `${this.rangementsUrl}/${id}`;
    return this.http.get<RangementModule>(url);
  }

  addRangement(rangement: RangementModule): Observable<RangementModule> {
    return this.http.post<RangementModule>(this.rangementsUrl, rangement);
  }

  updateRangement(rangement: RangementModule): Observable<any> {
    const url = `${this.rangementsUrl}/${rangement.id}`;
    return this.http.put(url, rangement);
  }

  deleteRangement(id: number): Observable<any> {
    const url = `${this.rangementsUrl}/${id}`;
    return this.http.delete(url);
  }
  getRangementsByColonneId(colonneid: number): Observable<RangementModule[]> {
    const url = `${this.rangementsUrl}/colonne/${colonneid}`;
    return this.http.get<RangementModule[]>(url);
  }
  getRangementsByProduitId(produitId: number): Observable<RangementModule[]> {
    const url = `${this.rangementsUrl}/produit/${produitId}`;
    return this.http.get<RangementModule[]>(url);
  }

  
  getRangementventeByProduitId(produitId: number): Observable<RangementModule> {
    const url = `${this.rangementsUrl}/vente/${produitId}`;
    return this.http.get<RangementModule>(url);
  }
  updateRangementStock(produitId: number, selledStock: number): Observable<RangementModule> {
    const url = `${this.rangementsUrl}/update-stock/${produitId}`;
    return this.http.put<RangementModule>(url, selledStock);
  }
}
