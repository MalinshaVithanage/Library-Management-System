import { Routes } from '@angular/router';
import { register } from 'node:module';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';

export const routes: Routes = [
    
  { path: "login", component: LoginComponent },
  { path: "register", component: SignupComponent },
  { path: "home", component: LoginComponent },
];
