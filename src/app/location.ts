import { Campaign } from "./campaign.interface";
import { Quest } from "./quest";

export interface Location {
    id?: number;
    campaignId: number;
    plane: string;
    name: string;
    description?: string;
  }