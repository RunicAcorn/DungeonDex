// user.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user-service.service';
import { Router } from '@angular/router';
import { CampaignListComponent } from '../campaign-list/campaign-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-username-display',
  standalone: true,
  imports: [CampaignListComponent, CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  username: string ='';
  userId: string = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsername().subscribe(
      (response: any) => {
        this.username = response.user;
        this.userId = response.id;
        console.log('Username retrieved successfully:', response);
      },
      (error: any) => {
        console.error('Error retrieving username:', error);
      }
    );

  }

    backToMenu() {
      this.router.navigate(['/login']);
    }
    CreateClick() {
      this.router.navigate(['/createCampaign']);
    }
   
  }


