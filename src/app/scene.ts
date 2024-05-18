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
  
  export interface Statement {
    id?: number;
    speaker: string;
    text: string;
    order: number;
  }
  
  export interface Dialogue extends Scene {
    statements: Statement[];
  }