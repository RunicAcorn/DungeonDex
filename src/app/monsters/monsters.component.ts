import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MonsterService } from '../monster.service';
import { Router } from '@angular/router';
import { Monster } from '../monster.interface';


@Component({
  selector: 'app-monsters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './monsters.component.html',
  styleUrl: './monsters.component.css'
})
export class MonstersComponent implements OnInit{
  monsters: Monster[] = [];
  campaignId!: number;

  constructor(private ar:ActivatedRoute, private ms:MonsterService, private router: Router) {}

  ngOnInit(): void
  {
    this.ar.params.subscribe(params => {
      this.campaignId = params['id'];
      // Use this.campaignId to fetch campaign details from the API
      this.getMonsters(this.campaignId);

     
    }
    
);
  }

  getMonsters(campaignId: number): void {
    this.ms.getMonstersByCampaignId(campaignId).subscribe({
      next: 
        (data: any) => {
          this.monsters = data.$values;
          console.log("Monsters: ", data.$values);
        }
      ,
      error: (e) => console.error(e)
    });
    



  }

  selectMonster(selectedMonster: Monster): void {
    console.log("Selected monster: " + selectedMonster);
    this.router.navigate(['/monster/select', selectedMonster.id]);
  }

  addMonster(): void {
    this.router.navigate(['/monster/add', this.campaignId]);
  }

  deleteMonster(monster: Monster): void {
    this.ms.deleteMonster(monster).subscribe({
      next: () => this.monsters = this.monsters.filter(m => m.id !== monster.id),
      error: (e) => console.error(e)
    });
  }

  backToCodex(): void {
    this.router.navigate(['/codex', this.campaignId]);
  }

}
