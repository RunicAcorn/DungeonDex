import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormsModule, Validators, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CharacterService } from '../character.service';
import { Character } from '../character';


@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.css'
})
export class CharacterDetailsComponent  implements OnInit{

  characterDetailsForm: FormGroup = new FormGroup({});
  campaignId!: number;

  character!: Character;

  constructor
  ( private ar: ActivatedRoute, 
    private router: Router, 
    private fb: FormBuilder,
  private characterService: CharacterService) {

    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      console.log("state found", navigation.extras.state['character']);
      
      this.character = navigation.extras.state['character'];
    }

   }

  ngOnInit(): void {

    this.ar.params.subscribe(params => {
      this.campaignId = params['id'];

      
    this.characterDetailsForm = this.fb.group({
      campaignId: [this.campaignId, Validators.required],
      name: [this.character.name, Validators.required],
      race: [this.character.race, Validators.required],
      class: [this.character.class, Validators.required],
      alignment: [this.character.alignment, Validators.required],
      level: [this.character.level, Validators.required],
      hitPoints: [this.character.hitPoints, Validators.required],
      strength: [this.character.strength, Validators.required],
      dexterity: [this.character.dexterity, Validators.required],
      constitution: [this.character.constitution, Validators.required],
      intelligence: [this.character.intelligence, Validators.required],
      wisdom: [this.character.wisdom, Validators.required],
      charisma: [this.character.charisma, Validators.required]
    });

    this.characterDetailsForm.patchValue(this.character);

    })  

  
  }

  onSubmit(): void {

    Object.assign(this.character, this.characterDetailsForm.value);
    this.characterService.updateCharacter(this.character)
    .subscribe({
      next: (data) => {
        console.log("Character updated successfully.", data);
        this.router.navigate(['/character', this.campaignId]);
      },
      error: (e) => console.error(e)
    });
  }
}

