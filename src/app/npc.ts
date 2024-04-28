import { Campaign } from "./campaign.interface";
import { Monster } from "./monster.interface";

export interface NPC {
    campaign: Campaign;
    id: number;
    name: string;
    race: string;
    age: number;
    class?: string;
    location?: string;
    description?: string;
    notes?: string;
    image?: string;
    hasMonsterStats?: Monster;
  }