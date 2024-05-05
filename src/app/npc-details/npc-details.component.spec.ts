import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NPCDetailsComponent } from './npc-details.component';

describe('NPCDetailsComponent', () => {
  let component: NPCDetailsComponent;
  let fixture: ComponentFixture<NPCDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NPCDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NPCDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
