import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CampaignService } from '../campaign.service';

@Component({
  selector: 'app-newcampaignform',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './newcampaignform.component.html',
  styleUrl: './newcampaignform.component.css'
})
export class NewcampaignformComponent {
  campaign = {
    Name: '',
    Description: ''
  };

  constructor(private campaignServ: CampaignService) { }

  submitCampaign() {
    this.campaignServ.createCampaign(this.campaign).subscribe(
      response => {
        console.log('Campaign created successfully:', response);
        // Handle success, such as displaying a success message or redirecting
      },
      error => {
        console.error('Failed to create campaign:', error);
        // Handle error, such as displaying an error message to the user
      }
    )
  }
}


