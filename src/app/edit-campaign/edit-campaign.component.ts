import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Campaign } from '../campaign.interface';
import { CampaignService } from '../campaign.service';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-edit-campaign',
  templateUrl: './edit-campaign.component.html',
  standalone: true,
  imports:[FormsModule, FormGroup],
  styleUrls: ['./edit-campaign.component.scss']
})
export class EditCampaignComponent {
  @Input()campaign!: Campaign;
  @Output() saveCampaign = new EventEmitter<void>();

  form: FormGroup;
  
  constructor(private campaignService: CampaignService, private fb: FormBuilder)
  {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });

  }

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