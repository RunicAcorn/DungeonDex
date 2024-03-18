import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CampaignService } from '../campaign.service';
import { UserService } from '../user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newcampaignform',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './newcampaignform.component.html',
  styleUrl: './newcampaignform.component.css'
})
export class NewcampaignformComponent {
  Campaign = {
    name: '',
    description: '',
    userId: '',
  };
  

  constructor(private campaignServ: CampaignService, private userService: UserService, private router: Router) { }


  ngOnInit(): void {
    this.userService.getUsername().subscribe(
      (response: any) => {
        this.Campaign.userId = response.userId;
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
        this.router.navigate(['/menu']);
      },
      error => {
        console.error('Failed to create campaign:', error);
        // Handle error, such as displaying an error message to the user
      }
    )
  }
}


