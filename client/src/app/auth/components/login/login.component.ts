import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth/auth.service';

import { DemoNgZorroAntdModule } from '../../../../NgZorroImportsModule';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DemoNgZorroAntdModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authService: any;
  snackBar: any;
  constructor(private service: AuthService, private fb:FormBuilder, private router: Router
    ){}

  isSpinning: boolean = false;
  loginForm!: FormGroup;

ngOnInit(){
  this.loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
});
}
 

login(){
  console.log('Login que envia el front: \n'+JSON.stringify(this.loginForm.value));

  this.service.login(this.loginForm.value).subscribe((res)=>{
    console.log('Respuesta del servidor al front: \n' );
    console.log(res);
    if(res.user.username!=null){
      
        const arrayAuthorities = [];
        const authorities = res.user.authorities;
        for (let i = 0; i < authorities.length; i++) {
          let authority = authorities[i].authority;
          arrayAuthorities.push(authority);
        }
        const user = {
          username: res.user.username,
          role: arrayAuthorities
        };
        
        StorageService.saveToken(res.token);
        StorageService.saveUser(user);
        console.log('Usuario del local storage: \n'+JSON.stringify(StorageService.getUser()));
        if(StorageService.isAdminLoggedIn()){
          this.router.navigateByUrl('admin/dashboard') ; 
        }else if(StorageService.isCustomerLoggedIn()){
          this.router.navigateByUrl('customer/dashboard');
        }
    }else{
      console.log('Error al iniciar sesion');
    }
    
  });
  
}

}