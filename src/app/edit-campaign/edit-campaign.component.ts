import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Campaign } from '../campaign.interface';
import { CampaignService } from '../campaign.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-edit-campaign',
  templateUrl: './edit-campaign.component.html',
  standalone: true,
  imports:[FormsModule]
})
export class EditCampaignComponent {
  @Input()campaign!: Campaign;
  
  
  constructor(private campaignService: CampaignService) {}

  onSave() {
    if (this.campaign != null) {
      this.campaignService.updateCampaign(this.campaign).subscribe(
        updatedCampaign => {
          console.log("updated successfully" + updatedCampaign);
        },
        error => {
          console.error("error: " + error);
        }
      )
    }

  }
}