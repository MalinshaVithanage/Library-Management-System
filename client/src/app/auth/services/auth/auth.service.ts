import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 


  constructor(private http: HttpClient) { }
  
  signup(signupRequest:any): Observable<any> {
    console.log(signupRequest);
    return this.http.post<[]>(BASE_URL + 'api/auth/signup', signupRequest);
    
  }
  login(loginrequest:any): Observable<any> {
    
     console.log(loginrequest);
    return this.http.post<[]>(BASE_URL + 'api/auth/login',loginrequest)
    
  }
    
  
}
