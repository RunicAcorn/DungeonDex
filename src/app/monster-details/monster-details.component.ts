import { Component, OnInit } from '@angular/core';
import { Monster } from '../monster.interface';
import { MonsterService } from '../monster.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormsModule, Validators, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-monster-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './monster-details.component.html',
  styleUrl: './monster-details.component.css'
})
export class MonsterDetailsComponent  implements OnInit{

  monsterDetailsForm: FormGroup = new FormGroup({});
  monsterId!: number;

  monster: Monster = {
    campaignId: 1,
    name: 'Defaulto the Default Monster',
    type: 'Default Type',
    alignment: 'True Neutral',
    hitPoints: 1,
    armorClass: 13,
    speed: 60000000,
    strength: 1,
    dexterity: 1,
    constitution: 1,
    intelligence: -1,
    wisdom: 2,
    charisma: 9001
  };

  constructor
  ( private ms: MonsterService, 
    private ar: ActivatedRoute, 
    private router: Router, 
    private fb: FormBuilder ) {

    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.monster = navigation.extras.state['monster'];

     
    }
   

    
   }

  ngOnInit(): void {

   

    this.ar.params.subscribe(params => {
      this.monsterId = params['id'];
      
      this.monsterDetailsForm = this.fb.group({
        name: [this.monster.name, Validators.required],
        type: [this.monster.type, Validators.required],
        alignment: ['dddd', Validators.required],
        hitPoints: ['', Validators.required],
        armorClass: ['', Validators.required],
        speed: ['', Validators.required],
        strength: [this.monster.strength, Validators.required],
        dexterity: ['', Validators.required],
        constitution: ['', Validators.required],
        intelligence: ['', Validators.required],
        wisdom: ['', Validators.required],
        charisma: ['', Validators.required]
      });
  
      this.monsterDetailsForm.patchValue(this.monster);
    
    })  
  }

  onSubmit(): void {
  }
}

