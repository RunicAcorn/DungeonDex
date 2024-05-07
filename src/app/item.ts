export interface Item {
    id?: number;
    campaignId: number;
    name: string;
    description?: string;
    type: string;
  }

  export interface Weapon extends Item {
    damageDice: string;
  }

  export interface Potion extends Item {
    effect: string;
  }