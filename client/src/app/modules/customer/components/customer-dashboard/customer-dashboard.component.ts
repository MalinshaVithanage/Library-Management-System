import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
//import { Router, RouterOutlet } from '@angular/router';  esto es para que funcione el router-outlet en el app.component.html
import { FormBuilder,ReactiveFormsModule, FormsModule, Validators, FormGroup } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { RouterModule } from '@angular/router';

import { NzInputModule } from 'ng-zorro-antd/input';
@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [NzGridModule, CommonModule, NzButtonModule, NzFormModule, NzInputModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.scss'
})
export class CustomerDashboardComponent {
  constructor(private service: CustomerService, private fb:FormBuilder) {}
  categories: any=[];
  validateForm!:FormGroup;
  size:NzButtonSize = 'large'; // esto es para que el boton sea grande
  isSpinnerVisible?:boolean;



  ngOnInit(): void {
    
    this.validateForm = this.fb.group({
      title: ['', [Validators.required]],
    });
    this.getCategories();
  }

    
    

  getCategories() {
    this.service.getAllCategories().subscribe((res) => {
      res.forEach((element:any) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg ;
        this.categories.push(element);
      });
      console.log('Categorias obtenidas con imagenes procesadas: \n');
      console.log(this.categories);
    });
  };


  submitForm() {
    this.isSpinnerVisible = true;
    this.categories = [];
    this.service.getAllCategoriesByTitle(this.validateForm.get(['title'])?.value).subscribe((res) => {
      res.forEach((element:any) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg ;
        this.categories.push(element);
        
      });
      this.isSpinnerVisible = false;
      console.log('Categorias obtenidas por busquedad con imagenes procesadas: \n');
      console.log(this.categories);
    });
  }

}
