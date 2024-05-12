import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Character } from '../character';
import { CharacterService } from '../character.service';
import { Alignment } from '../aligment';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css'
})
export class CharactersComponent implements OnInit{
  characters: Character[] = [];
  campaignId!: number;

  alignments = Alignment;

  constructor(private ar:ActivatedRoute, private cs:CharacterService, private router: Router) {}

  ngOnInit(): void
  {
    this.ar.params.subscribe(params => {
      this.campaignId = params['id'];
      // Use this.campaignId to fetch campaign details from the API
      this.cs.getCharacterByCampaignId(this.campaignId)
      .subscribe({
        next: (data) => this.characters = data,
        error: (e) => console.error(e)
      });
    }
    
);
  }

  


  selectCharacter(selected: number | undefined): void {
    if (selected === undefined) {
      console.error('No character selected');
      return;
    }

    console.log("Selected Character: " , selected);
    this.router.navigate(['/character/select', selected]);
  }

  addCharacter(): void {
    this.router.navigate(['/character/add', this.campaignId]);
  }

  deleteCharacter(character: Character): void {
    
    this.cs.deleteCharacter(character).subscribe({
      next: () => this.characters = this.characters.filter(l => l.id !== character.id),
      error: (e) => console.error(e)
    });
    
  }


  backToCodex(): void {
    this.router.navigate(['/codex', this.campaignId]);
  }

}
