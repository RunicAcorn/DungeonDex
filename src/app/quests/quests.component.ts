import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Quest } from '../quest';
import { QuestService } from '../quest.service';

@Component({
  selector: 'app-quests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quests.component.html',
  styleUrl: './quests.component.css'
})
export class QuestsComponent implements OnInit{
  quests: Quest[] = [];
  campaignId!: number;

  constructor(private ar:ActivatedRoute, private qs:QuestService, private router: Router) {}

    ngOnInit(): void
    {
      this.ar.params.subscribe(params => {
        this.campaignId = params['id'];
        // Use this.campaignId to fetch campaign details from the API
        this.getQuests(this.campaignId);
      
        })
    }

  getQuests(campaignId: number): void {
    this.qs.getQuestsByCampaignId(campaignId).subscribe({
      next: 
        (data: any) => {
          this.quests = data.$values;
          console.log("NPCs: ", data.$values);
        }
      ,
      error: (e) => console.error(e)
    });
  }

  selectQuest(selected: Quest): void {
    console.log("Selected Quest: " + selected);
    this.router.navigate(['/quest/select', this.campaignId], {state: {quest: selected}});
  }

  addQuest(): void {
    this.router.navigate(['/quest/add', this.campaignId]);
  }

  deleteQuest(Quest: Quest): void {
    
    this.qs.deleteQuest(Quest).subscribe({
      next: () => this.quests = this.quests.filter(l => l.id !== Quest.id),
      error: (e) => console.error(e)
    });
  }

  backToCodex(): void {
    this.router.navigate(['/codex', this.campaignId]);
  }


}
