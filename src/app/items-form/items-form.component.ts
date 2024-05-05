import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './items-form.component.html',
  styleUrls: ['./items-form.component.css']
})
export class ItemsFormComponent implements OnInit {
  item!: Item;
  
  campaignId!: number;

  constructor( private ar: ActivatedRoute, private is: ItemService, private router: Router) { }

  ngOnInit(): void {
    this.ar.params.subscribe(params => {

      this.campaignId = params['id'];

      this.item = {
        campaignId: this.campaignId,
        name: '',
        description: '',
      }
      console.log("item is", this.item);
    });
  }

  submitItem(): void {
    this.is.createItem(this.item).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/item', this.campaignId]);
      },
      error: (e) => console.error(e)
    });
  }
}