import { Component } from '@angular/core';
import { FormBuilder,ReactiveFormsModule, FormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CommonModule } from '@angular/common';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-view-products',
  standalone: true,
  imports: [ CommonModule, NzButtonModule, RouterModule, NzGridModule, NzFormModule ,NzButtonModule,NzInputModule,NzGridModule,ReactiveFormsModule],
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.scss'
})
export class ViewProductsComponent {
  constructor(private activatedRoute: ActivatedRoute, private adminService: AdminService, private fb:FormBuilder, private message:NzMessageService) {}

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
    this.adminService.getAllProductsByCategory(this.categoryId).subscribe((response:any)=>{
      response.forEach((element:any) => { //recorro la respuesta y le agrego la imagen procesada para mostrarla en el front
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        
        this.products.push(element);

      });
      
      
    });
  }

  submitForm():void{
    this.isSpinnerVisible = true;
    this.products = [];
    this.adminService.getProductsByCategoryAndTitle(this.categoryId,this.validateForm.get(['title'])?.value).subscribe((res) => {
      res.forEach((element:any) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg ;
        this.products.push(element);
        
      });
      this.isSpinnerVisible = false;
      console.log('Productos obtenidos por busquedad con imagenes procesadas: \n');
      console.log(this.products);
    });
  }

  deleteProduct(productId:number):void{
    this.adminService.deleteProduct(productId).subscribe((response:any)=>{
      if(response == null){
        this.getProductsByCategory();
        this.message.success('Producto eliminado correctamente', {nzDuration: 5000});
      }else{
        this.message.error('Error al eliminar el producto', {nzDuration: 5000});
      }
    });
  }
}
