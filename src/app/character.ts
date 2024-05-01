import { Campaign } from "./campaign.interface";

export interface Character {
    id?: number;
    campaignId: number; // Replace 'any' with the actual type
    ownedBy: any; // Replace 'any' with the actual type
    name: string;
    race: string;
    class: string | null;
    level: number;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    hitPoints: number;
    alignment: number; // Replace 'string' with the actual type if 'Alignment' is an enum
}