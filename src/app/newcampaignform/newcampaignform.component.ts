import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CampaignService } from '../campaign.service';
import { UserService } from '../user-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Campaign } from '../campaign.interface';

@Component({
  selector: 'app-newcampaignform',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './newcampaignform.component.html',
  styleUrl: './newcampaignform.component.scss'
})
export class NewcampaignformComponent {
  campaign: Campaign = {
    name: '',
    description: '',
    userId: ''
  };
  user!: string;

  constructor(private campaignServ: CampaignService, private userService: UserService, private router: Router) { }


  ngOnInit(): void {

    this.userService.getUsername().subscribe(
      (response: any) => {
        console.log('Username retrieved successfully:', response);
        this.user = response.userId;
        this.campaign = {
          name: '',
          description: '',
          userId: this.user
        }
        console.log(this.campaign); // Add this line

      },
      (error: any) => {
        console.error('Error retrieving username:', error);
      },
 );


  }

  /*
  submitCampaign() {
    this.campaignServ.createCampaign(this.campaign).subscribe(
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

  */

  submitCampaign(): void {
    this.campaignServ.createCampaign(this.campaign).subscribe({
      next: (data) => {console.log(data)
        this.router.navigate(['/menu'])},
      error: (e) => console.error(e)
    });
}

}
