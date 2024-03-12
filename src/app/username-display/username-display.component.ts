// user.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-username-display',
  templateUrl: './username-display.component.html',
  styleUrls: ['./username-display.component.css']
})
export class UsernameDisplayComponent {
  username: string ='';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsername().subscribe(
      (username: string) => {
        this.username = username;
      },
      (error: any) => {
        console.error('Error retrieving username:', error);
      }
    );

  }

    backToMenu() {
      this.router.navigate(['/login']);
    }
   
  }


