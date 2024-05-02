import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../player.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Player } from '../player';


@Component({
  selector: 'app-player-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './player-form.component.html',
  styleUrl: './player-form.component.css'
})
export class PlayerFormComponent implements OnInit{
  player!: Player;
  campaignId!: number;

  constructor( private ar: ActivatedRoute, private ms:PlayerService, private router: Router) { }

  ngOnInit(): void {
    this.ar.params.subscribe(params => {
      this.campaignId = +params['id'];
   
      this.player = {  
        campaignId: this.campaignId,
        name: '',
      };
    } );
  }

  submitPlayer(): void {
    this.ms.addPlayer(this.player).subscribe({
      next: (data) => {console.log(data)
        this.router.navigate(['/player', this.campaignId])},
      error: (e) => console.error(e)
    });



}
}