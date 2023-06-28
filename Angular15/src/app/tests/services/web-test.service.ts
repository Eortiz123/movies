import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebTestService {

  public TOKEN = '';
  public SERVER_API:any = '';
  public SERVER_API_Local:any = 'http://localhost';

  constructor(private http: HttpClient) {    
  }

  getHeader() {
    return new HttpHeaders()
    .set('accept', 'application/json')
    .set('Authorization', `Bearer ${this.TOKEN}`)
    .set('enterprise-id', '');
  }
  
  private nameURIUN = ':5083/api/Movies';
  getPeliculas(query:any): Observable<any> {
    return this.http.get(this.SERVER_API_Local+`${this.nameURIUN}/?${query}`);
  }
  getByIdPeliculas(id:any): Observable<any> {
    return this.http.get(this.SERVER_API_Local+`${this.nameURIUN}/${id}`);
  }
  postPeliculas(params:any): Observable<any> {
    return this.http.post(this.SERVER_API_Local+`${this.nameURIUN}/`, params);
  }
  putPeliculas(params:any): Observable<any> {
    return this.http.put(this.SERVER_API_Local+`${this.nameURIUN}`, params);
  }
  patchPeliculas(params:any): Observable<any> {
    return this.http.patch(this.SERVER_API_Local+`${this.nameURIUN}`, params);
  }
  deletePeliculas(id:any): Observable<any> {
    return this.http.delete(this.SERVER_API_Local+`${this.nameURIUN}/?id=${id}`);
  }
}
