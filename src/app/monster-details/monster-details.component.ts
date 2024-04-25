import { Component } from '@angular/core';
import { Monster } from '../monster.interface';

@Component({
  selector: 'app-monster-details',
  standalone: true,
  imports: [],
  templateUrl: './monster-details.component.html',
  styleUrl: './monster-details.component.css'
})
export class MonsterDetailsComponent {

  private monster: Monster;

}
