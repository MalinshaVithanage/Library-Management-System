import { Injectable } from '@angular/core';

const TOKEN = 'token';
const USER = 'user';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  static saveToken(token: string){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static saveUser(user: any):void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken(): any{
    return localStorage.getItem(TOKEN);
  }

  static getUser(): any{
    return JSON.parse(localStorage.getItem(USER) || '{}');
  }

  static getUserRole(): [string]{
    const user = this.getUser();
    if(!(Object.keys(user).length === 0 && user.constructor === Object)){
      return user.role;
    }
    return [''];
  }

  static isAdminLoggedIn(): boolean{
    if(this.getToken === null){
      return false;
    }
    const role:[string] = this.getUserRole();
    return (role.includes('ADMIN'));
  }

  static isCustomerLoggedIn(): boolean{
    if(this.getToken === null){
      return false;
    }
    const role:[string] = this.getUserRole();
    return (role.includes('CUSTOMER'));
  }
  static signOut(): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}