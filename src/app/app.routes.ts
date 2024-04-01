import { Routes } from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { LoginMenuComponent } from './login-menu/login-menu.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { NewcampaignformComponent } from './newcampaignform/newcampaignform.component';
import { EditCampaignComponent } from './edit-campaign/edit-campaign.component';
import { CampaignDetailsComponent } from './campaign-details/campaign-details.component';
import { DMToolsComponent } from './dmtools/dmtools.component';
import { StoryComponent } from './story/story.component';
import { CodexComponent } from './codex/codex.component';
import { CreateChapterComponent } from './create-chapter/create-chapter.component';
import { ScenesComponent } from './scenes/scenes.component';
import { SceneCreatorComponent } from './scene-creator/scene-creator.component';
import { SceneDisplayComponent } from './scene-display/scene-display.component';

export const routes: Routes = [
    {path: '', component: LoginMenuComponent},
    {path: 'register', component: UserRegistrationComponent},
    {path: 'login', component: LoginComponent},
    {path: 'menu', component: MenuComponent},
    {path: 'createCampaign', component: NewcampaignformComponent},
    {path: 'editCampaign/:id', component: EditCampaignComponent},
    {path: 'campaign/:id', component: CampaignDetailsComponent },
    {path: 'tools', component: DMToolsComponent},
    {path: 'tools/:id', component: DMToolsComponent},
    {path: 'story/:id', component: StoryComponent },
    {path: 'codex/:id', component: CodexComponent},
    {path: 'chapter/add/:id', component: CreateChapterComponent},
    {path: 'chapter/:id', component: ScenesComponent},
    {path: 'scene/add/:id', component: SceneCreatorComponent},
    {path: 'chapter/:chapterid/:sceneid', component: SceneDisplayComponent}
  
    
];
