import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CampaignService } from '../campaign.service';
import { CommonModule } from '@angular/common';
import { Campaign } from '../campaign.interface';
import { Router } from '@angular/router';
import { EditCampaignComponent } from '../edit-campaign/edit-campaign.component';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-campaign-list',
  standalone: true,
  imports: [CommonModule, EditCampaignComponent],
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss']
})
export class CampaignListComponent implements OnInit {

  @Output() editCampaignEmit = new EventEmitter<Campaign>();

  showEditComponent = false;
  userId!: string;
  campaigns: Campaign[] = [];
  selectedCampaign!: Campaign;

  onEditCampaignEmit(campaign: Campaign) {
    this.editCampaignEmit.emit(this.selectedCampaign);
    console.log("emitted: " + this.selectedCampaign);
     this.selectedCampaign = campaign;
  }

  constructor(private campaignService: CampaignService, private router: Router, private userService: UserService) {
   
   }

  ngOnInit(): void {
    this.userService.getUsername().subscribe(
      (userIdData: any) => {
        this.userId = userIdData.userId;
        
        this.getCampaigns();
      },
      (error: any) => {
        console.error('Error retrieving userId:', error);
      }

    );

    

  }

  toggleShowEdit(){
    this.showEditComponent = !this.showEditComponent;
  }
  sendCampaignToEditor(campaignId: number | undefined) {

    if (campaignId !== undefined) {
      this.router.navigate(['/editCampaign', campaignId])
    }else {
      // Handle the case where campaignId is undefined, such as displaying an error message
      console.error('Campaign ID is undefined.');
    }
  
    
  }

  selectCampaign(campaignId: number | undefined): void {
    if (campaignId !== undefined) {
      this.router.navigate(['/campaign', campaignId])
    }else {
      // Handle the case where campaignId is undefined, such as displaying an error message
      console.error('Campaign ID is undefined.');
    }
   
  }

  handleSaveEvent(): void {
    console.log('got emiited event');
    this.toggleShowEdit();
  }

;
  
  getCampaigns(): void {
    // Assuming you have the user ID, replace 'userIdValue' with the actual user ID
     
    console.log('trying from getcampt '+ this.userId)
    this.campaignService.getCampaignsByUserId(this.userId).subscribe({
      next: (response: any) => {
        console.log(response);
        this.campaigns = response.$values;
      },
      error: (error) => {
        console.error('Error fetching campaigns:', error);
      }
    });
  }

  /*
  editCampaign(campaign: Campaign): void {
    // Implement edit logic here
    console.log('Editing campaign:', campaign);

    
     this.selectedCampaign = campaign;
      this.router.navigate(['editCampaign'])
    
  }
  */

  onSaveCampaign(updatedCampaign: Campaign): void {
    // Update the campaign in the campaigns array
    const index = this.campaigns.findIndex(c => c.campaignId === updatedCampaign.campaignId);
    if (index !== -1) {
      this.campaigns[index] = updatedCampaign;
    }

    this.toggleShowEdit();
  }

  deleteCampaign(campaginToDelete: number | undefined): void {

    if (campaginToDelete === undefined) {
      console.error('Campaign ID is undefined.');
      return;
    }
    // Implement delete logic here
    console.log('Deleting campaign:');
    //Stop Propagation is to prevent the event from bubbling up to the list when delete is clicked.
  

   


    if (campaginToDelete !== undefined) {
      this.campaignService.deleteCampaign(campaginToDelete).subscribe(
        () => {
          // Remove the deleted campaign from the campaigns array
          this.campaigns = this.campaigns.filter(c => c.campaignId !== campaginToDelete);
          console.log('Campaign deleted successfully:', campaginToDelete);
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
