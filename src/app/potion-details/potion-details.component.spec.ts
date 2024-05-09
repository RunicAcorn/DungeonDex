import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotionDetailsComponent } from './potion-details.component';

describe('PotionDetailsComponent', () => {
  let component: PotionDetailsComponent;
  let fixture: ComponentFixture<PotionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PotionDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PotionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
