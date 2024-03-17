// user.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service.service';
import { Router } from '@angular/router';
import { CampaignListComponent } from '../campaign-list/campaign-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-username-display',
  standalone: true,
  imports: [CampaignListComponent, CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  username: string ='';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsername().subscribe(
      (response: any) => {
        this.username = response.user;
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


