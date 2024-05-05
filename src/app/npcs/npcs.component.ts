import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NPC } from '../npc';
import { NPCService } from '../npc.service';

@Component({
  selector: 'app-npcs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './npcs.component.html',
  styleUrl: './npcs.component.css'
})
export class NPCsComponent implements OnInit{
  npcs: NPC[] = [];
  campaignId!: number;

  constructor(private ar:ActivatedRoute, private ls:NPCService, private router: Router) {}

  ngOnInit(): void
  {
    this.ar.params.subscribe(params => {
      this.campaignId = params['id'];
      // Use this.campaignId to fetch campaign details from the API
      this.getNPCs(this.campaignId);


    }
    
);
  }

  getNPCs(campaignId: number): void {
    this.ls.getNPCByCampaignId(campaignId).subscribe({
      next: 
        (data: any) => {
          this.npcs = data.$values;
          console.log("NPCs: ", data.$values);
        }
      ,
      error: (e) => console.error(e)
    });
  }

  selectNPC(selected: NPC): void {
    console.log("Selected NPC: " + selected);
    this.router.navigate(['/npc/select', this.campaignId], {state: {NPC: selected}});
  }

  addNPC(): void {
    this.router.navigate(['/npc/add', this.campaignId]);
  }

  deleteNPC(NPC: NPC): void {
    
    this.ls.deleteNPC(NPC).subscribe({
      next: () => this.npcs = this.npcs.filter(l => l.id !== NPC.id),
      error: (e) => console.error(e)
    });
    
  }


  backToCodex(): void {
    this.router.navigate(['/codex', this.campaignId]);
  }

}
