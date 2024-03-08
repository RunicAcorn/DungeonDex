import { Routes } from '@angular/router';
import { NameDisplayComponent } from './name-display/name-display.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { MenuComponent } from './menu/menu.component';

export const routes: Routes = [
    {path: 'test', component: NameDisplayComponent},
    {path: 'register', component: UserRegistrationComponent},
    {path: '', component: MenuComponent},
];
