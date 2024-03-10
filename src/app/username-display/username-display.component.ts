// user.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './username-display.component.html',
  styleUrls: ['./username-display.component.css']
})
export class UsernameDisplayComponent implements OnInit {
  username: string ='';

  constructor(private userService: UserService) { }

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
}
