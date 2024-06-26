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
import { QuestFormComponent } from './quest-form/quest-form.component';
import { QuestDetailsComponent } from './quest-details/quest-details.component';
import { LocationsComponent } from './locations/locations.component';
import { NPCsComponent } from './npcs/npcs.component';
import { NPCFormComponent } from './npc-form/npc-form.component';
import { NPCDetailsComponent } from './npc-details/npc-details.component';
import { ItemsComponent } from './items/items.component';
import { ItemsFormComponent } from './items-form/items-form.component';
import { ItemDetailsComponent } from './items-details/items-details.component';
import { PotionDetailsComponent} from './potion-details/potion-details.component';
import { MonsterDetailsComponent } from './monster-details/monster-details.component';
import { LocationFormComponent } from './location-form/location-form.component';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { CharacterFormComponent } from './character-form/character-form.component';
import { PlayersComponent } from './players/players.component';
import { PlayerFormComponent } from './player-form/player-form.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { WeaponDetailsComponent } from './weapon-details/weapon-details.component';


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
    {path: 'scene/:sceneid', component: SceneDisplayComponent},
    {path: 'monster/:id', component: MonstersComponent},
    {path: 'monster/add/:id', component: MonsterFormComponent},
    {path: 'monster/select/:id', component: MonsterDetailsComponent},
    {path: 'imageWizard/:id', component: ImageGeneratorComponent},
    {path: 'character/:id', component: CharactersComponent},
    {path: 'character/add/:id', component: CharacterFormComponent},
    {path: 'quest/:id', component: QuestsComponent},
    {path: 'location/:id', component: LocationsComponent},
    {path: 'location/add/:id', component: LocationFormComponent},
    {path: 'location/select/:id', component: LocationDetailsComponent},
    {path: 'npc/:id', component: NPCsComponent},
    {path: 'npc/add/:id', component: NPCFormComponent},
    {path: 'npc/select/:id', component: NPCDetailsComponent},
    {path: 'item/:id', component: ItemsComponent},
    {path: 'item/add/:id', component: ItemsFormComponent},
    {path: 'item/select/:id', component: ItemDetailsComponent},
    {path: 'potion/select/:id', component: PotionDetailsComponent},
    {path: 'player/:id', component: PlayersComponent},
    {path: 'player/add/:id', component: PlayerFormComponent},
    {path: 'player/select/:id', component: PlayerDetailsComponent},
    {path: 'character/select/:id', component: CharacterDetailsComponent},
    {path: 'quest/add/:id', component: QuestFormComponent},
    {path: 'quest/select/:id', component: QuestDetailsComponent},
    {path: 'weapon/select/:id', component: WeaponDetailsComponent},
    {path: '**', redirectTo: ''}

  
    
];
