import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

const BASIC_URL = ['http://localhost:8080/'];
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private httpc: HttpClient) { }

 

  createAuthorizationHeader():HttpHeaders { //retorna um header con el token de autorizacion
    let authHeader:HttpHeaders = new HttpHeaders();
    return authHeader.set('Authorization', 'Bearer ' + StorageService.getToken());
  }




  //metodos para el manejo de categorias

  postCategory(categoryDto: any): Observable<any> {
    console.log('Se envia a la api:');
    console.log(categoryDto);
    return this.httpc.post<[]>(BASIC_URL[0] + 'api/admin/category', categoryDto,
    {headers: this.createAuthorizationHeader()});
  }
  getAllCategories(): Observable<any> {
    return this.httpc.get<[]>(BASIC_URL[0] + 'api/admin/categories',
    {headers: this.createAuthorizationHeader()});
  }

  getAllCategoriesByTitle(title:string): Observable<any> {
    return this.httpc.get<[]>(BASIC_URL[0] + 'api/admin/categories/' + title,
    {headers: this.createAuthorizationHeader()});
  }

  //metedos para el manejo de productos

  postProduct(categoryId:number,productDto: any): Observable<any> {
    return this.httpc.post<[]>(BASIC_URL[0] + 'api/admin/'+categoryId+'/product', productDto,
    {headers: this.createAuthorizationHeader()});
  }

  getAllProductsByCategory(categoryId:number): Observable<any> {
    return this.httpc.get<[]>(BASIC_URL[0] + 'api/admin/'+categoryId+'/products',
    {headers: this.createAuthorizationHeader()});
  }

  getProductsByCategoryAndTitle(categoryId:number,title:string): Observable<any> {
    return this.httpc.get<[]>(BASIC_URL[0] + 'api/admin/'+categoryId+'/products/'+title,
    {headers: this.createAuthorizationHeader()});
  }
  deleteProduct(productId:number): Observable<any> {
    return this.httpc.delete<[]>(BASIC_URL[0] + 'api/admin/product/'+productId,
    {headers: this.createAuthorizationHeader()});
  }

  getProductById(productId:number): Observable<any> {
    return this.httpc.get<[]>(BASIC_URL[0] + 'api/admin/product/'+productId,
    {headers: this.createAuthorizationHeader()});
  }

  updateProduct(productId:number,productDto: any): Observable<any> {
    return this.httpc.put<[]>(BASIC_URL[0] + 'api/admin/product/'+productId, productDto,
    {headers: this.createAuthorizationHeader()});
  }

}
