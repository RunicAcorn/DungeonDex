import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NPCsComponent } from './npcs.component';

describe('NPCsComponent', () => {
  let component: NPCsComponent;
  let fixture: ComponentFixture<NPCsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NPCsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NPCsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
