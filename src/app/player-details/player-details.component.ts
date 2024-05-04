import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormsModule, Validators, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PlayerService } from '../player.service';
import { Player } from '../player';


@Component({
  selector: 'app-player-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './player-details.component.html',
  styleUrl: './player-details.component.css'
})
export class PlayerDetailsComponent  implements OnInit{

  playerDetailsForm: FormGroup = new FormGroup({});
  campaignId!: number;

  player!: Player;

  constructor
  ( private ar: ActivatedRoute, 
    private router: Router, 
    private fb: FormBuilder,
  private ps: PlayerService) {

    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.player = navigation.extras.state['player'];
    }

    
    this.ar.params.subscribe(params => {
      this.campaignId = params['id'];

      if (this.campaignId) {
        this.playerDetailsForm = this.fb.group({
          campaignId: [this.campaignId, Validators.required],
          name: [this.player.name, Validators.required],
        });

      this.playerDetailsForm.patchValue(this.player);
    }});  


   }

  ngOnInit(): void {

   

    
  
  }

  onSubmit(): void {

    Object.assign(this.player, this.playerDetailsForm.value);
    this.ps.updatePlayer(this.player)
    .subscribe({
      next: (data) => {
        console.log("Player updated successfully.", data);
        this.router.navigate(['/player', this.campaignId]);
      },
      error: (e) => console.error(e)
    });
  }
}

