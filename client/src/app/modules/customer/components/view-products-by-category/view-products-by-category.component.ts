import { Component } from '@angular/core';
import { FormBuilder,ReactiveFormsModule, FormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CommonModule } from '@angular/common';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CustomerService } from '../../services/customer.service';
@Component({
  selector: 'app-view-products-by-category',
  standalone: true,
  imports: [CommonModule, NzButtonModule, RouterModule, NzGridModule, NzFormModule ,NzButtonModule,NzInputModule,NzGridModule,ReactiveFormsModule],
  templateUrl: './view-products-by-category.component.html',
  styleUrl: './view-products-by-category.component.scss'
})
export class ViewProductsByCategoryComponent {
  constructor(private activatedRoute: ActivatedRoute, private customerService: CustomerService, private fb:FormBuilder, private message:NzMessageService) {}

  categoryId:number = this.activatedRoute.snapshot.params['categoryId'];
  products:any = [];
  isSpinnerVisible:boolean = false;
  validateForm!:FormGroup;
  size:NzButtonSize = 'large';
  
  
  ngOnInit():void{
    this.validateForm = this.fb.group({
      title: ['', [Validators.required]]
    });
    this.getProductsByCategory();
    
  }

  getProductsByCategory():void{
    this.products = [];
    this.customerService.getAllProductsByCategory(this.categoryId).subscribe((response:any)=>{
      response.forEach((element:any) => { //recorro la respuesta y le agrego la imagen procesada para mostrarla en el front
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        
        this.products.push(element);

      });
      
      
    });
  }

  submitForm():void{
    this.isSpinnerVisible = true;
    this.products = [];
    this.customerService.getProductsByCategoryAndTitle(this.categoryId,this.validateForm.get(['title'])?.value).subscribe((res) => {
      res.forEach((element:any) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg ;
        this.products.push(element);
        
      });
      this.isSpinnerVisible = false;
      console.log('Productos obtenidos por busquedad con imagenes procesadas: \n');
      console.log(this.products);
    });
  }

  
}
