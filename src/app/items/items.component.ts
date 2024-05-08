import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Item, Potion, Weapon } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Item[] = [];
  campaignId!: number;

  constructor(private ar: ActivatedRoute, private is: ItemService, private router: Router) {}

  ngOnInit(): void {
    this.ar.params.subscribe(params => {
      this.campaignId = params['id'];
      this.getItems(this.campaignId);
    })
  }

  getItems(campaignId: number): void {
    this.is.getItemsByCampaignId(campaignId).subscribe({
      next: (data: any) => {
        this.items = data.$values;
        console.log("Items: ", data.$values);
      },
      error: (e) => console.error(e)
    });
  }

  selectItem(selected: Item | Weapon | Potion): void {
    console.log("Selected Item: " + selected.type);
 /*
    let route: string;
    let state: any;

    switch (selected.type.toLowerCase()) {
      case 'weapon':
        route = '/weapon/select';
        state = {weapon: selected};
        break;
      case 'potion':
        route = '/potion/select';
        state = {potion: selected};
        break;
      default:
        route = '/item/select';
        state = {item: selected};
    }

    this.router.navigate([route, this.campaignId], {state: state});
    */
  }

  addItem(): void {
    this.router.navigate(['/item/add', this.campaignId]);
  }

  deleteItem(item: Item): void {
    this.is.deleteItem(item).subscribe({
      next: () => this.items = this.items.filter(l => l.id !== item.id),
      error: (e) => console.error(e)
    });
  }

  backToCodex(): void {
    this.router.navigate(['/codex', this.campaignId]);
  }
}