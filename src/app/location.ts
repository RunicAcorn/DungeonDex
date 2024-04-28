import { Campaign } from "./campaign.interface";
import { Quest } from "./quest";

export interface Location {
    id: number;
    campaign: Campaign;
    quests: Quest[];
    plane: string;
    name: string;
    description?: string;
  }