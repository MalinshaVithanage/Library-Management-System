import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,ReactiveFormsModule,FormGroup, Validators } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DemoNgZorroAntdModule } from '../../../../../NgZorroImportsModule';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-post-product',
  standalone: true,
  imports: [NzGridModule,NzFormModule,NzSpinModule,DemoNgZorroAntdModule, NzButtonModule, NzInputModule,ReactiveFormsModule,CommonModule],
  templateUrl: './post-product.component.html',
  styleUrl: './post-product.component.scss'
})
export class PostProductComponent {
  constructor(private fb:FormBuilder, private service: AdminService, private router:Router, private activatedRouter:ActivatedRoute, private message:NzMessageService) {}

  categoryId:number = this.activatedRouter.snapshot.params['categoryId'];
  validateForm!:FormGroup;
  selectedFile?:File | null;
  imagePreview?:string | ArrayBuffer | null;
  isSpinning = false;
  

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name:['',[Validators.required]],
      price:['',[Validators.required]],
      description:['',[Validators.required]]
    });
  }

  
  getAllCategories(){
    this.service.getAllCategories().subscribe((data:any)=>{
      console.log(data);
    });
  }

  submitForm(){
    this.isSpinning = true;
    const formData = new FormData();
    formData.append('name',this.validateForm.get('name')!.value);
    formData.append('price',this.validateForm.get('price')!.value);
    formData.append('description',this.validateForm.get('description')!.value);
    formData.append('categoryId',this.categoryId.toString());
    formData.append('img',this.selectedFile!);
    this.service.postProduct(this.categoryId,formData).subscribe((data:any)=>{
      console.log('Se le responde al front \n: ');
      console.log(data);
      this.isSpinning = false;
      if(data.id!=null){
        this.message.success('Product added successfully',{nzDuration:5000});
        this.router.navigate(['/admin/dashboard']);
      }else{
        this.message.error('Error while adding product',{nzDuration:5000});
      }
    });
  }
  onFileSelected(event:any){
    this.selectedFile = <File>event.target.files[0];
    this.previewImage();
  } 
  previewImage(){
    const reader = new FileReader();
    reader.onload = (e:any)=>{
      this.imagePreview = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile!);
  }

}
