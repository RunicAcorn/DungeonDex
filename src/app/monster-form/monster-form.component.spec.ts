import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterFormComponent } from './monster-form.component';

describe('MonsterFormComponent', () => {
  let component: MonsterFormComponent;
  let fixture: ComponentFixture<MonsterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonsterFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonsterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
