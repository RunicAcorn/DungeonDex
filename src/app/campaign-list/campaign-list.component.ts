import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CampaignService } from '../campaign.service';
import { CommonModule } from '@angular/common';
import { Campaign } from '../campaign.interface';
import { Router } from '@angular/router';
import { EditCampaignComponent } from '../edit-campaign/edit-campaign.component';

@Component({
  selector: 'app-campaign-list',
  standalone: true,
  imports: [CommonModule, EditCampaignComponent],
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit {

  @Output() editCampaignEmit = new EventEmitter<Campaign>();

  showEditComponent = true;

  campaigns: Campaign[] = [];
  selectedCampaign!: Campaign;

  onEditCampaignEmit(campaign: Campaign) {
    this.editCampaignEmit.emit(campaign);
    console.log("emitted: " + campaign);
  }

  constructor(private campaignService: CampaignService, private router: Router ) {
   
   }

  ngOnInit(): void {
    this.getCampaigns();
  }

  toggleEditComponent() {
    this.showEditComponent = !this.showEditComponent;
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

  
  editCampaign(campaign: Campaign): void {
    // Implement edit logic here
    console.log('Editing campaign:', campaign);

    
     this.selectedCampaign = campaign;
      this.router.navigate(['editCampaign'])
    
  }

  onSaveCampaign(updatedCampaign: Campaign): void {
    // Update the campaign in the campaigns array
    const index = this.campaigns.findIndex(c => c.campaignId === updatedCampaign.campaignId);
    if (index !== -1) {
      this.campaigns[index] = updatedCampaign;
    }
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
