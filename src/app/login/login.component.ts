import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { UserService } from '../user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) {}

  submitForm() {

    
    if (!this.username || !this.password) {
      console.error('Username and password are required');
      return;
    }


 this.userService.loginUser(this.username, this.password).subscribe(
      response => {
        console.log('User logged successfully:', response  );
        // Handle success, such as displaying a success message or redirecting
        //Not sure what's wrong here that makes it so I am not getting a totally correct response.
        sessionStorage.setItem('jwtToken', response.token);
        this.router.navigate(['/menu']);
        
      },
      error => {
        console.error(error);
    
        switch(error.status){
          case 200:
            console.log("successful login but still errored");
            console.log(error.token);
            break;
          case 400:
            console.log("error logging in");
            break;

            default:
              break;
        } 
        // Handle error, such as displaying an error message to the user
        }
    );
  }
}
