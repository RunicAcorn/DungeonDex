import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneDisplayComponent } from './scene-display.component';

describe('SceneDisplayComponent', () => {
  let component: SceneDisplayComponent;
  let fixture: ComponentFixture<SceneDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SceneDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SceneDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
