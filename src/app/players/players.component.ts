import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../player.service';
import { Router } from '@angular/router';
import { Player } from '../player';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent implements OnInit{
  players: Player[] = [];
  campaignId!: number;

  constructor(private ar:ActivatedRoute, private ms:PlayerService, private router: Router) {}

  ngOnInit(): void
  {
    this.ar.params.subscribe(params => {
      this.campaignId = params['id'];
      // Use this.campaignId to fetch campaign details from the API
     

      this.ms.getPlayersByCampaignId(this.campaignId)
      .subscribe({
        next: (data:any) => {
          this.players = data.$values;
          console.log("Players: ", data.$values);
        },
        error: (e) => console.error(e)
      });
    }
    
);
  }

  selectPlayer(selectedPlayer: Player): void {
    console.log("Selected player: " + selectedPlayer);
    this.router.navigate(['/player/select', this.campaignId], {state: {player: selectedPlayer}});
  }

  addPlayer(): void {
    this.router.navigate(['/player/add', this.campaignId]);
  }

  deletePlayer(player: Player): void {
    this.ms.deletePlayer(player).subscribe({
      next: () => this.players = this.players.filter(m => m.id !== player.id),
      error: (e) => console.error(e)
    });
  }

  backToCodex(): void {
    this.router.navigate(['/codex', this.campaignId]);
  }

}
