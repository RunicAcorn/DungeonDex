import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormsModule, Validators, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemService } from '../item.service';
import { Item } from '../item';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './items-details.component.html',
  styleUrls: ['./items-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  itemDetailsForm: FormGroup = new FormGroup({});
  campaignId!: number;
  item!: Item;

  constructor(
    private ar: ActivatedRoute, 
    private router: Router, 
    private fb: FormBuilder,
    private is: ItemService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.item = navigation.extras.state['item'];
    }

    this.ar.params.subscribe(params => {
      this.campaignId = params['id'];

      if (this.campaignId) {
        this.itemDetailsForm = this.fb.group({
          campaignId: [this.campaignId, Validators.required],
          name: [this.item.name, Validators.required],
          description: [this.item.description, Validators.required]
        });

        this.itemDetailsForm.patchValue(this.item);
      }
    });  
  }

  ngOnInit(): void {}

  onSubmit(): void {
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