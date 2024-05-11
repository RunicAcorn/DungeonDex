import { Component, OnInit } from '@angular/core';
import { Monster } from '../monster.interface';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormsModule, Validators, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MonsterService } from '../monster.service';
import { Alignment } from '../aligment';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-monster-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './monster-details.component.html',
  styleUrl: './monster-details.component.css'
})
export class MonsterDetailsComponent  implements OnInit{

  monsterDetailsForm: FormGroup = new FormGroup({});
  campaignId!: number;

  monsterId!: number;

  alignments = Object.keys(Alignment)
  .filter(key => isNaN(Number(key)))
  .map(key => ({ text: key, value: Alignment[key as keyof typeof Alignment] }));
  

  monster!: Monster;

  constructor
  ( private ar: ActivatedRoute, 
    private router: Router, 
    private fb: FormBuilder,
  private monsterService: MonsterService) {

  

   }

  ngOnInit(): void {

    this.monsterDetailsForm = this.fb.group({
      campaignId: ['', Validators.required],
      id: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
      alignment: ['', Validators.required],
      hitPoints: ['', Validators.required],
      strength: ['', Validators.required],
      dexterity: ['', Validators.required],
      constitution: ['', Validators.required],
      intelligence: ['', Validators.required],
      wisdom: ['', Validators.required],
      charisma: ['', Validators.required],
      armorClass: ['', Validators.required],
      speed: ['', Validators.required]
    });

    this.ar.params.subscribe(params => {
      this.monsterId = params['id'];
    });
    
    this.monsterService.getMonsterById(this.monsterId).subscribe({
      next: (data: any) => {
        console.log("Data: ", data.$values);
        this.monster = data;
        this.campaignId = this.monster.campaignId;

        this.monsterDetailsForm.patchValue({
          campaignId: this.campaignId,
          id: this.monsterId,
          name: this.monster.name,
          type: this.monster.type,
          alignment: this.monster.alignment,
          hitPoints: this.monster.hitPoints,
          strength: this.monster.strength,
          dexterity: this.monster.dexterity,
          constitution: this.monster.constitution,
          intelligence: this.monster.intelligence,
          wisdom: this.monster.wisdom,
          charisma: this.monster.charisma,
          armorClass: this.monster.armorClass,
          speed: this.monster.speed
        });
      },
      error: (e) => console.error(e)
    });

   
  
  }

  onSubmit(): void {

    const formValue = this.monsterDetailsForm.value;
    formValue.alignment = parseInt(formValue.alignment, 10);

    Object.assign(this.monster, this.monsterDetailsForm.value);
    this.monsterService.updateMonster(this.monster)
    .subscribe({
      next: (data) => {
     
        this.router.navigate(['/monster', this.campaignId]);
      },
      error: (e) => console.error(e)
    });
  }
}

