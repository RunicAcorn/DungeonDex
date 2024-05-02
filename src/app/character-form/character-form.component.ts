import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Character } from '../character';
import { CharacterService } from '../character.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-character-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './character-form.component.html',
  styleUrl: './character-form.component.css'
})
export class CharacterFormComponent implements OnInit{
  character!: Character;
  

  campaignId!: number;

  constructor( private ar: ActivatedRoute, private ls:CharacterService, private router: Router) { }

  ngOnInit(): void {
    this.ar.params.subscribe(params => {

      this.campaignId = params['id'];

      this.character = {
        campaignId: this.campaignId,
        name: '',
        race: '',
        class: '',
        level: 0,
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0,
        hitPoints: 0,
        alignment: 1,
      }
      

    } );
  }

  onSubmit(): void {
    this.ls.addCharacter(this.character).subscribe({
      next: (data) => {console.log(data)
        this.router.navigate(['/character/', this.campaignId])},
      error: (e) => console.error(e)
    });



}
}