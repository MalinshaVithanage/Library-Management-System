import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';


const BASIC_URL = ['http://localhost:8080/']; 
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private httpc: HttpClient) { }



  createAuthorizationHeader():HttpHeaders { //retorna um header con el token de autorizacion
    let authHeader:HttpHeaders = new HttpHeaders();
    return authHeader.set('Authorization', 'Bearer ' + StorageService.getToken());
  }

  getAllCategories(): Observable<any> {
    return this.httpc.get<[]>(BASIC_URL[0] + 'api/customer/categories',
    {headers: this.createAuthorizationHeader()});
  }

  getAllCategoriesByTitle(title:string): Observable<any> {
    return this.httpc.get<[]>(BASIC_URL[0] + 'api/customer/categories/' + title,
    {headers: this.createAuthorizationHeader()});
  }

  getAllProductsByCategory(categoryId:number): Observable<any> {
    return this.httpc.get<[]>(BASIC_URL[0] + 'api/customer/'+categoryId+'/products',
    {headers: this.createAuthorizationHeader()});
  }
  getProductsByCategoryAndTitle(categoryId:number, title:string): Observable<any> {
    return this.httpc.get<[]>(BASIC_URL[0] + 'api/customer/'+categoryId+'/products/'+title,
    {headers: this.createAuthorizationHeader()});
  }

  postReservation(reservationDto:any): Observable<any> {
    reservationDto.customerUsername = StorageService.getUser().username.toString();
    reservationDto.id = 1;
    
    
    
    console.log('Se envia a la api:');
    console.log(reservationDto);
    return this.httpc.post<any>(BASIC_URL[0] + 'api/customer/reservation', reservationDto,
    {headers: this.createAuthorizationHeader()});
  }


}
