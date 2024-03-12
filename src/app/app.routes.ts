import { Routes } from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { UsernameDisplayComponent } from './username-display/username-display.component';

export const routes: Routes = [
    {path: '', component: MenuComponent},
    {path: 'register', component: UserRegistrationComponent},
    {path: 'login', component: LoginComponent},
    {path: 'username', component: UsernameDisplayComponent},
];
