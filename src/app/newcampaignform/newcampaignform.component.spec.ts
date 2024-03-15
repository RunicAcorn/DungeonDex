import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcampaignformComponent } from './newcampaignform.component';

describe('NewcampaignformComponent', () => {
  let component: NewcampaignformComponent;
  let fixture: ComponentFixture<NewcampaignformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewcampaignformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewcampaignformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
