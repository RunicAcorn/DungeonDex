import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MonsterService } from '../monster.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-monsters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './monsters.component.html',
  styleUrl: './monsters.component.css'
})
export class MonstersComponent implements OnInit{
  monsters: any[] = [];
  campaignId!: number;

  constructor(private ar:ActivatedRoute, private ms:MonsterService, private router: Router) {}
  ngOnInit(): void
  {
    this.ar.params.subscribe(params => {
      this.campaignId = params['id'];
      // Use this.campaignId to fetch campaign details from the API
      this.getMonsters(this.campaignId);

      this.ms.getMonstersByCampaignId(this.campaignId)
      .subscribe({
        next: (data) => this.monsters = data,
        error: (e) => console.error(e)
      });
    }
    
);
  }

  getMonsters(campaignId: number): void {
    this.ms.getMonstersByCampaignId(campaignId).subscribe(monsters => {
      this.monsters = monsters;
    });
  }

  selectMonster(monsterId: number): void {
    console.log("Selected monster: " + this.campaignId);
  }

  addMonster(): void {
    this.router.navigate(['/monsters/add', this.campaignId]);
  }

  backToCodex(): void {
    this.router.navigate(['/codex', this.campaignId]);
  }

}
