import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PhotoproduitModule } from 'app/module/photoproduit.module';
import { environment } from 'environments/environment';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhotoproduitService {
  private photoproduitUrl = `${environment.apiUrl}/api/Photoproduits`;

  constructor(private http: HttpClient) { }
  getPhotoproduits(): Observable<PhotoproduitModule[]> {
    return this.http.get<PhotoproduitModule[]>(`${this.photoproduitUrl}`);
  }

  getPhotoproduitById(id: number): Observable<PhotoproduitModule> {
    return this.http.get<PhotoproduitModule>(`${this.photoproduitUrl}/${id}`);
  }

  getPhotoproduitByProduit(produitId: number): Observable<PhotoproduitModule[]> {
    return this.http.get<PhotoproduitModule[]>(`${this.photoproduitUrl}/produit/${produitId}`);
  }

  addPhotoproduit(photoproduit: PhotoproduitModule): Observable<PhotoproduitModule> {
    return this.http.post<PhotoproduitModule>(`${this.photoproduitUrl}`, photoproduit);
  }

  updatePhotoproduit(id: number, photoproduit: PhotoproduitModule): Observable<any> {
    return this.http.put(`${this.photoproduitUrl}/${id}`, photoproduit);
  }

  deletePhotoproduit(id: number): Observable<any> {
    return this.http.delete(`${this.photoproduitUrl}/${id}`);
  }

 
  uploadPhoto(produitId: number, files: File[]): Observable<PhotoproduitModule[]> {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i].name);
    }  
    console.log(`${this.photoproduitUrl}/upload?produitId=${produitId}`)
    console.log("files=",files)
    console.log("formData=", formData)
    return this.http.post<PhotoproduitModule[]>(`${this.photoproduitUrl}/upload?produitId=${produitId}`, formData)
      .pipe(
        tap(response => console.log('Server response:', response)),
        catchError(error => {
          console.error('Error uploading photos:', error);
          return of(null);
        })
      );
  }

}





