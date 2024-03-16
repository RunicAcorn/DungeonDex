import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../campaign.service';
import { CommonModule } from '@angular/common';
import { Campaign } from '../campaign.interface';

@Component({
  selector: 'app-campaign-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit {
  campaigns: Campaign[] = [];

  constructor(private campaignService: CampaignService) { }

  ngOnInit(): void {
    this.getCampaigns();
  }

  getCampaigns(): void {
    // Assuming you have the user ID, replace 'userIdValue' with the actual user ID
    const userId = 'userIdValue';

    this.campaignService.getCampaignsByUserId(userId).subscribe(
      campaigns => {
        this.campaigns = campaigns;
      },
      error => {
        console.error('Error fetching campaigns:', error);
      }
    );
  }

  
  editCampaign(campaign: any): void {
    // Implement edit logic here
    console.log('Editing campaign:', campaign);
  }

  deleteCampaign(campaign: Campaign): void {
    // Implement delete logic here
    console.log('Deleting campaign:', campaign);

    const campaignId = campaign?.campaignId;


    if (campaignId !== undefined) {
      this.campaignService.deleteCampaign(campaignId).subscribe(
        () => {
          // Remove the deleted campaign from the campaigns array
          this.campaigns = this.campaigns.filter(c => c.campaignId !== campaignId);
          console.log('Campaign deleted successfully:', campaign);
        },
        error => {
          console.error('Error deleting campaign:', error);
        }
      );
    } else {
      console.error('Campaign ID is undefined.');
    
    }

  } 
}
