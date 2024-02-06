import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostReservationComponent } from './post-reservation.component';

describe('PostReservationComponent', () => {
  let component: PostReservationComponent;
  let fixture: ComponentFixture<PostReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostReservationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
