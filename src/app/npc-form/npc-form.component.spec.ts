import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NPCFormComponent } from './npc-form.component';

describe('NPCFormComponent', () => {
  let component: NPCFormComponent;
  let fixture: ComponentFixture<NPCFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NPCFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NPCFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
