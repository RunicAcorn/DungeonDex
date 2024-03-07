import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {

  username: string = '';
  password: string = '';

  constructor(private userService: UserService) {}

  submitForm() {

    console.log("password value is" + this.password)
    if (!this.username || !this.password) {
      console.error('Username and password are required');
      return;
    }


 this.userService.createUser(this.username, this.password).subscribe(
      response => {
        console.log('User created successfully:', response);
        // Handle success, such as displaying a success message or redirecting
      },
      error => {
        console.error('Failed to create user:', error);
        // Handle error, such as displaying an error message to the user
      }
    );
  }
}
