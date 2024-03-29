import { Component, Input } from '@angular/core';
import { Campaign } from '../campaign.interface';
import { CampaignService } from '../campaign.service';
import { FormBuilder, Validators, FormGroup, FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-edit-campaign',
  templateUrl: './edit-campaign.component.html',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  styleUrls: ['./edit-campaign.component.scss']
})
export class EditCampaignComponent {


  editCampaignId! :string;
  editUserId!: string;

  EditedCampaign = {
    name: '',
    description: ''
  };


  form: FormGroup;

  constructor(private campaignService: CampaignService, 
    private fb: FormBuilder, 
    private ar: ActivatedRoute,
    private userServ: UserService) {
    
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });

    // If you need to initialize form values with campaign data, do it here
  
  }

  ngOnInit(): void {
    this.ar.params.subscribe(params => {
      this.editCampaignId = params['id'];


      sessionStorage.setItem('campaignId', JSON.stringify(this.editCampaignId));

      this.userServ.getUsername().subscribe(
        (response: any) => {
          console.log("fdsfs + " + response.userId);
          this.editUserId = response.userId;


          this.form = this.fb.group({
           
            name: ['', Validators.required],
            description: [''], 
          
          });
    



        },
        (error: any) => {
          console.error('Error retrieving username:', error);
        }
      )

      // Use this.campaignId to fetch campaign details from the API
    });
  }


  onSave() {
    if (this.form.valid) {
      this.EditedCampaign = this.form.value;
      
      this.campaignService.updateCampaign(this.editCampaignId, this.EditedCampaign).subscribe(
        success => {
          console.log("Campaign updated successfully", success);
          // Perform any additional actions on success, like navigation or showing a success message
        },
        error => {
          console.error("Error updating campaign: ", error);
        }
      );
    }
  }
}
