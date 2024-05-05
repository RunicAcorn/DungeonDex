export interface Quest {
    id?: number;
    campaignId: number;
    name: string;
    objective: string;
    startLocation?: string;
  }