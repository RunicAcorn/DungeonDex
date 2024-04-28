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
import { MonstersComponent } from './monsters/monsters.component';
import { MonsterFormComponent } from './monster-form/monster-form.component';
import { ImageGeneratorComponent } from './image-generator/image-generator.component';
import { CharactersComponent } from './characters/characters.component';
import { QuestsComponent } from './quests/quests.component';
import { LocationsComponent } from './locations/locations.component';
import { NPCsComponent } from './npcs/npcs.component';
import { ItemsComponent } from './items/items.component';
import { MonsterDetailsComponent } from './monster-details/monster-details.component';
import { LocationFormComponent } from './location-form/location-form.component';



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
    {path: 'chapter/:chapterid/:sceneid', component: SceneDisplayComponent},
    {path: 'monster/:id', component: MonstersComponent},
    {path: 'monster/add/:id', component: MonsterFormComponent},
    {path: 'monster/select/:id', component: MonsterDetailsComponent},
    {path: 'imageWizard/:id', component: ImageGeneratorComponent},
    {path: 'character/:id', component: CharactersComponent},
    {path: 'quest/:id', component: QuestsComponent},
    {path: 'location/:id', component: LocationsComponent},
    {path: 'location/add/:id', component: LocationFormComponent},
    {path: 'npc/:id', component: NPCsComponent},
    {path: 'item/:id', component: ItemsComponent}

  
    
];
