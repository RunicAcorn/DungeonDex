import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestDetailsComponent } from './quest-details.component';

describe('QuestDetailsComponent', () => {
  let component: QuestDetailsComponent;
  let fixture: ComponentFixture<QuestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
