import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Item, Potion } from '../item';
import { Weapon } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './items-form.component.html',
  styleUrls: ['./items-form.component.css']
})
export class ItemsFormComponent implements OnInit {
  item: Item = {
    campaignId: 0,
    name: '',
    description: '',
    type: ''
  }
  weapon: Weapon = {...this.item, damageDice: ''};
  potion: Potion = {...this.item, effect: ''};

  campaignId!: number;

  constructor( private ar: ActivatedRoute, private is: ItemService, private router: Router) { }

  ngOnInit(): void {
    this.ar.params.subscribe(params => {

      this.campaignId = params['id'];

      this.item.campaignId = this.campaignId,
        
      

      this.weapon = {...this.item, damageDice: ''};

      console.log("item is", this.item);
    });
  }

  submitItem(): void {

    this.item.type = this.item.type.toLowerCase();
    switch (this.item.type) {
      default:
      this.is.createItem(this.item).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['/item', this.campaignId]);
        },
        error: (e) => console.error(e)
      });
      break;
      case 'weapon':
        this.weapon = {...this.item, damageDice: this.weapon.damageDice};
      this.is.createWeapon(this.weapon).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['/item', this.campaignId]);
        },
        error: (e) => console.error(e)
      });
      break;
      case 'potion':
        this.potion = {...this.item, effect: this.potion.effect};
      this.is.createPotion(this.potion).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['/item', this.campaignId]);
        },
        error: (e) => console.error(e)
      });
  }
}
}