import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../campaign.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-campaign-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit {
  campaigns: any[] = [];

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

  deleteCampaign(campaign: any): void {
    // Implement delete logic here
    console.log('Deleting campaign:', campaign);
  }


}
