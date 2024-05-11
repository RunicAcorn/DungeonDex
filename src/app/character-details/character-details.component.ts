import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormsModule, Validators, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CharacterService } from '../character.service';
import { Character } from '../character';
import { Alignment } from '../aligment';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.css'
})
export class CharacterDetailsComponent  implements OnInit{

  characterDetailsForm: FormGroup = new FormGroup({});
  campaignId!: number;
   alignments = Object.keys(Alignment)
  .filter(key => isNaN(Number(key)))
  .map(key => ({ text: key, value: Alignment[key as keyof typeof Alignment] }));
  


  characterId!: number;
  character!: Character;

  constructor
  ( private ar: ActivatedRoute, 
    private router: Router, 
    private fb: FormBuilder,
  private characterService: CharacterService) {


   }

  ngOnInit(): void {

    this.characterDetailsForm = this.fb.group({
      campaignId: ['', Validators.required],
      name: ['', Validators.required],
      race: ['', Validators.required],
      class: ['', Validators.required],
      alignment: ['', Validators.required],
      level: ['', Validators.required],
      hitPoints: ['', Validators.required],
      strength: ['', Validators.required],
      dexterity: ['', Validators.required],
      constitution: ['', Validators.required],
      intelligence: ['', Validators.required],
      wisdom: ['', Validators.required],
      charisma: ['', Validators.required]
    });
  

    this.ar.params.subscribe(params => {
      this.characterId = params['id'];

      this.characterService.getCharacterById(this.characterId).subscribe({
        next: (data: any) => {
          console.log("Data from service: ", data);
          this.character = data;

          this.campaignId = this.character.campaignId;

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

        }, error: (e) => console.error(e)

        
      });
      
  

   

    })  

  
  }

  onSubmit(): void {

    const formValue = this.characterDetailsForm.value;
    formValue.alignment = parseInt(formValue.alignment, 10);
   

    Object.assign(this.character, this.characterDetailsForm.value);
    this.characterService.updateCharacter(this.character)
    .subscribe({
      next: (data) => {

        this.router.navigate(['/character', this.campaignId]);
      },
      error: (e) => console.error(e)
    });
  }
}

