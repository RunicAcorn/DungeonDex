import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Character } from '../character';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css'
})
export class CharactersComponent implements OnInit{
  Characters: Character[] = [];
  campaignId!: number;

  constructor(private ar:ActivatedRoute, private cs:CharacterService, private router: Router) {}

  ngOnInit(): void
  {
    this.ar.params.subscribe(params => {
      this.campaignId = params['id'];
      // Use this.campaignId to fetch campaign details from the API
      this.getCharacter(this.campaignId);

      this.cs.getCharacterByCampaignId(this.campaignId)
      .subscribe({
        next: (data) => this.Characters = data,
        error: (e) => console.error(e)
      });
    }
    
);
  }

  getCharacter(campaignId: number): void {
    this.cs.getCharacterByCampaignId(campaignId).subscribe(Characters => {
      this.Characters = Characters;
    });
  }

  selectCharacter(selected: Character): void {
    console.log("Selected Character: " + selected);
    this.router.navigate(['/Character/select', this.campaignId], {state: {Character: selected}});
  }

  addCharacter(): void {
    this.router.navigate(['/Character/add', this.campaignId]);
  }

  deleteCharacter(Character: Character): void {
    
    this.cs.deleteCharacter(Character).subscribe({
      next: () => this.Characters = this.Characters.filter(l => l.id !== Character.id),
      error: (e) => console.error(e)
    });
    
  }


  backToCodex(): void {
    this.router.navigate(['/codex', this.campaignId]);
  }

}
