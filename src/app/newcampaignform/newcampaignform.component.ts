import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CampaignService } from '../campaign.service';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-newcampaignform',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './newcampaignform.component.html',
  styleUrl: './newcampaignform.component.css'
})
export class NewcampaignformComponent {
  Campaign = {
    Name: '',
    Description: '',
    UserId: ''
  };
  

  constructor(private campaignServ: CampaignService, private userService: UserService) { }


  ngOnInit(): void {
    this.userService.getUsername().subscribe(
      (response: any) => {
        this.Campaign.UserId = response.userId;
      },
      (error: any) => {
        console.error('Error retrieving username:', error);
      }
    )
  }

  submitCampaign() {
    this.campaignServ.createCampaign(this.Campaign).subscribe(
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


