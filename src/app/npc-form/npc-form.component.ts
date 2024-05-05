import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NPC } from '../npc';
import { NPCService } from '../npc.service';

@Component({
  selector: 'app-npc-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './npc-form.component.html',
  styleUrl: './npc-form.component.css'
})
export class NPCFormComponent implements OnInit{
  npc!: NPC;
  
  campaignId!: number;

  constructor( private ar: ActivatedRoute, private npcs:NPCService, private router: Router) { }

  ngOnInit(): void {
    this.ar.params.subscribe(params => {

      this.campaignId = params['id'];

      this.npc = {
        campaignId: this.campaignId,
        name: '',
        description: '',
        race: '',
        age: 0,

      }
      console.log("npc is", this.npc);
    } );
  }

  submitNPC(): void {
    this.npcs.addNPC(this.npc).subscribe({
      next: (data) => {console.log(data)
        this.router.navigate(['/npc', this.campaignId])},
      error: (e) => console.error(e)
    });



}
}