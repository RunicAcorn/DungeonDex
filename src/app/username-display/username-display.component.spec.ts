import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernameDisplayComponent } from './username-display.component';

describe('UsernameDisplayComponent', () => {
  let component: UsernameDisplayComponent;
  let fixture: ComponentFixture<UsernameDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsernameDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsernameDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
