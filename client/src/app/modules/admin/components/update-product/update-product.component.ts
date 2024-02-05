import { Component,OnInit ,AfterViewInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,ReactiveFormsModule,FormGroup, Validators } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
//router
import { Router,ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [NzGridModule,NzFormModule,NzSpinModule, NzButtonModule, NzInputModule,ReactiveFormsModule,CommonModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent {
  constructor(private fb: FormBuilder,private adminService: AdminService,private router: Router,private activatedRoute: ActivatedRoute,private message: NzMessageService) {}

  productId:number = this.activatedRoute.snapshot.params['productId']; 
  isSpinning = false;
  validateForm!: FormGroup;
  selectedFile: any;
  imagePreview?: string| ArrayBuffer|null;
  existingImage: string | null= null;
  imgChanged: boolean=false;


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
    this.getProductById();//obtengo el producto por id
    //console.log(this.existingImage);
  }
  
  getProductById():void{
    this.adminService.getProductById(this.productId).subscribe((res:any)=>{
      this.validateForm.patchValue(res);
      this.existingImage = 'data:image/jpeg;base64,' + res.returnedImg;
    });
  }
  

  onFileSelected(event:any){
    this.selectedFile = <File>event.target.files[0];
    this.previewImage();
     this.imgChanged = true;
    this.existingImage = null;
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  updateProduct():void{
    this.isSpinning = true;
    const formData = new FormData();
    formData.append('name',this.validateForm.get('name')?.value);
    formData.append('price',this.validateForm.get('price')?.value);
    formData.append('description',this.validateForm.get('description')?.value);
    if(this.selectedFile && this.imgChanged){
      formData.append('img',this.selectedFile);
    }
    console.log('Data to send:\n');
    console.log(formData);
    this.adminService.updateProduct(this.productId,formData).subscribe((res:any)=>{
      this.isSpinning = false;
      if(res.id!=null){
        this.message.success('Producto actualizado con éxito', { nzDuration: 5000 });
        this.router.navigateByUrl('/admin/dashboard');
      }else{
        this.message.error('Error al actualizar el producto', { nzDuration: 5000 });
      }
      
    },(error:any)=>{
      this.isSpinning = false;
      this.message.error(error.error.message);
    });
  
}
}