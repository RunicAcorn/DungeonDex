import { Campaign } from "./campaign.interface";
import { NPC } from "./npc";

export interface Quest {
    id: number;
    campaign: Campaign;
    questGiver: NPC;
    name: string;
    description: string;
    objective: string;
    reward: string;
    startLocation: Location;
  }