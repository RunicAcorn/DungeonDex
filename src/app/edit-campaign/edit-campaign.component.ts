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
  @Output() saveCampaign = new EventEmitter<void>();
  
  constructor(private campaignService: CampaignService) {}

  onSave() {
    if (this.campaign != null) {
      this.campaignService.updateCampaign(this.campaign).subscribe(
        updatedCampaign => {
          console.log("updated successfully" + updatedCampaign);
          this.saveCampaign.emit();
        },
        error => {
          console.error("error: " + error);
        }
      )
    }

  }
}