import { Routes } from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { LoginMenuComponent } from './login-menu/login-menu.component';
import { LoginComponent } from './login/login.component';
import { UsernameDisplayComponent } from './username-display/username-display.component';
import { NewcampaignformComponent } from './newcampaignform/newcampaignform.component';

export const routes: Routes = [
    {path: '', component: LoginMenuComponent},
    {path: 'register', component: UserRegistrationComponent},
    {path: 'login', component: LoginComponent},
    {path: 'username', component: UsernameDisplayComponent},
    {path: 'createCampaign', component: NewcampaignformComponent}
];
