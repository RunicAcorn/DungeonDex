import { Statement } from "@angular/compiler";


export interface Scene {
    id?: number;
    title: string;
    description: string;
    order: number;
    chapterId: number;
  }
  
  export interface Narrative extends Scene {
    events: string[];
  }

  export interface Dialogue extends Scene {
    statements: Statement[];
  }