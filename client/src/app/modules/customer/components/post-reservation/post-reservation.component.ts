import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,ReactiveFormsModule,FormGroup, Validators } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
//router
import { Router,ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-post-reservation',
  standalone: true,
  imports: [NzGridModule,NzFormModule,NzSpinModule, NzButtonModule, NzInputModule,ReactiveFormsModule,CommonModule,NzSelectModule,NzDatePickerModule],
  templateUrl: './post-reservation.component.html',
  styleUrl: './post-reservation.component.scss'
})
export class PostReservationComponent {
  constructor(private fb:FormBuilder, private customerService:CustomerService){}
    isSpinning:boolean = false;
    validateForm!: FormGroup;
    TableType:any = [
      "Standard table",
      "Booth",
      "Conmunal table",
      "High table",
      "Bar",
      "Counter",
      "Private room",
      "Outdoor table",
      "Chef's table",
      "Banqueted"

    ];

    ngOnInit(): void {
      this.validateForm = this.fb.group({
        
        description:['',[Validators.required]],
        tableType:['',[Validators.required]]
      });
    }

    postReservation(){
      console.log('Reservation to create:');
        console.log(this.validateForm.value);
      this.customerService.postReservation(this.validateForm.value).subscribe(
        (data) => {
          console.log('Reservation created');
          console.log(data);
        }
      )
    }

}
