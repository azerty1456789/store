import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProduitModule } from 'app/module/produit.module';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  //private produitsUrl = 'https://localhost:7258/api/Produits';
  private produitsUrl = `${environment.apiUrl}/api/Produits`;

  constructor(private http: HttpClient) { }
  getProduits(): Observable<ProduitModule[]> {
    return this.http.get<ProduitModule[]>(this.produitsUrl);
  }
  
  getPaginatedProduits(pageNumber: number = 1, pageSize: number = 10): Observable<any> {
    const url = `${this.produitsUrl}/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }
  getProduit(id: number): Observable<ProduitModule> {
    const url = `${this.produitsUrl}/${id}`;
    return this.http.get<ProduitModule>(url);
  }
  getProduitsByNomLike(nom: string): Observable<ProduitModule[]> {
    const url = `${this.produitsUrl}/nomlike/${nom}`;
    return this.http.get<ProduitModule[]>(url);
  }
  addProduit(produit: ProduitModule): Observable<ProduitModule> {
    return this.http.post<ProduitModule>(this.produitsUrl, produit);
  }

  updateProduit(produit: ProduitModule): Observable<ProduitModule> {
    const url = `${this.produitsUrl}/${produit.id}`; 
    return this.http.put<ProduitModule>(url, produit);
  }

  deleteProduit(id: number): Observable<ProduitModule> {
    const url = `${this.produitsUrl}/${id}`;
    return this.http.delete<ProduitModule>(url);
  }

  getProductByBarcode(barcode: string): Observable<ProduitModule> {
    const url = `${this.produitsUrl}/barcode/${barcode}`;
    return this.http.get<ProduitModule>(url);
  }
}


