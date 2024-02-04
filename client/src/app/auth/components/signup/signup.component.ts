import { Component } from '@angular/core';
import {
  FormsModule, 
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Route, Router, RouterLink } from '@angular/router';
import { DemoNgZorroAntdModule } from '../../../../NgZorroImportsModule';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    DemoNgZorroAntdModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  isSpinning: boolean = false;
  validateform!: FormGroup;
  constructor(private authService: AuthService, 
    private fb:FormBuilder, 
    private notification:NzNotificationService,
    private router: Router,
    ) {}

 

  ngOnInit() {
    this.validateform = this.fb.group({
       name: ['', [Validators.required]],
       email: ['', [Validators.required, Validators.email]],
       password: ['', [Validators.required]],
       checkPassword: ['', [Validators.required, this.confirmationValidator]]
   });
   
   }
 

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) { 
      return { required: true };
    } else if (control.value !== this.validateform.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  }


  
  register(){
    console.log('Se le pasa del fornt: \n'+JSON.stringify(this.validateform.value));
     this.authService.signup(this.validateform.value).subscribe((res)=>{
      console.log('sent \n: '+JSON.stringify(res));
      this.isSpinning = true;
      if(res.id != null){
        this.notification.success('Sign Up - Successful'," ", {nzDuration: 5000});
        this.router.navigateByUrl('login') ; 
      }else{
        this.notification.error('Something went wrong'," ", {nzDuration: 5000});
      }

     });
  }


}
