import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DMToolsComponent } from './dmtools.component';

describe('DMToolsComponent', () => {
  let component: DMToolsComponent;
  let fixture: ComponentFixture<DMToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DMToolsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DMToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
