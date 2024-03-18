import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProduitdefectueuxModule } from 'app/module/produitdefectueux.module';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProduitdefectueuxService {
  private produitdefectueuxsUrl = `${environment.apiUrl}/api/Produitdefectueuxes`;

  constructor(private http: HttpClient) { }
  getProduitdefectueuxs(): Observable<ProduitdefectueuxModule[]> {
    return this.http.get<ProduitdefectueuxModule[]>(this.produitdefectueuxsUrl);
  }

  getProduitdefectueux(id: number): Observable<ProduitdefectueuxModule> {
    const url = `${this.produitdefectueuxsUrl}/${id}`;
    return this.http.get<ProduitdefectueuxModule>(url);
  }

  addProduitdefectueux(produit: ProduitdefectueuxModule): Observable<ProduitdefectueuxModule> {
    return this.http.post<ProduitdefectueuxModule>(this.produitdefectueuxsUrl, produit);
  }

  updateProduitdefectueux(produit: ProduitdefectueuxModule): Observable<ProduitdefectueuxModule> {
    const url = `${this.produitdefectueuxsUrl}/${produit.id}`; 
    return this.http.put<ProduitdefectueuxModule>(url, produit);
  }

  deleteProduitdefectueux(id: number): Observable<ProduitdefectueuxModule> {
    const url = `${this.produitdefectueuxsUrl}/${id}`;
    return this.http.delete<ProduitdefectueuxModule>(url);
  }

 
}
