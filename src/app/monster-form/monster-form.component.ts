import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MonsterService } from '../monster.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Monster } from '../monster.interface';


@Component({
  selector: 'app-monster-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './monster-form.component.html',
  styleUrl: './monster-form.component.css'
})
export class MonsterFormComponent implements OnInit{
  monster!: Monster;
  campaignId!: number;

  constructor( private ar: ActivatedRoute, private ms:MonsterService, private router: Router) { }

  ngOnInit(): void {
    this.ar.params.subscribe(params => {
      this.campaignId = +params['id'];
   
      this.monster = {  
        campaignId: this.campaignId,
        name: '',
        type: '',
        alignment: '',
        hitPoints: 0,
        armorClass: 0,
        speed: 0,
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0}
    } );
  }

  submitMonster(): void {
    this.ms.addMonster(this.monster).subscribe({
      next: (data) => {console.log(data)
        this.router.navigate(['/monster', this.campaignId])},
      error: (e) => console.error(e)
    });



}
}