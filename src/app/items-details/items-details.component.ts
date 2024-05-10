import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormsModule, Validators, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemService } from '../item.service';
import { Item } from '../item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './items-details.component.html',
  styleUrls: ['./items-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  itemDetailsForm: FormGroup = new FormGroup({});
  campaignId!: number;
  itemId!: number;
  item!: Item;

  constructor(
    private ar: ActivatedRoute, 
    private router: Router, 
    private fb: FormBuilder,
    private is: ItemService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.itemId = navigation.extras.state['item'];
    }
  }

  ngOnInit(): void {
    this.itemDetailsForm = this.fb.group({
      campaignId: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      effect: ['', Validators.required]
    });

    this.ar.params.subscribe(params => {
      this.campaignId = params['id'];

      if (this.campaignId) {
        this.is.getItemById(this.itemId).subscribe({
          next: (data: any) => {
            console.log("Data: ", data);
            this.item = data;

            this.itemDetailsForm.patchValue({
              campaignId: this.campaignId,
              name: this.item.name,
              description: this.item.description,
            });
          },
          error: (e) => console.error(e)
        });
      }
    });  
  }

  onSubmit(): void {
    if (!this.itemDetailsForm) {
      console.error("Item Details Form is null.");
      return;
    }
    Object.assign(this.item, this.itemDetailsForm.value);
    this.is.updateItem(this.item)
    .subscribe({
      next: (data) => {
        console.log("Item updated successfully.", data);
        this.router.navigate(['/item', this.campaignId]);
      },
      error: (e) => console.error(e)
    });
  }
}