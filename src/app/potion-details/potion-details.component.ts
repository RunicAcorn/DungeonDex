import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormsModule, Validators, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemService } from '../item.service';
import { Potion } from '../item';

@Component({
  selector: 'app-potion-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl:   './potion-details.component.html',
  styleUrls: ['./potion-details.component.css']
})
export class PotionDetailsComponent implements OnInit {
  potionDetailsForm: FormGroup = new FormGroup({});
    campaignId!: number;
  potion!: Potion;

  constructor(
    private ar: ActivatedRoute, 
    private router: Router, 
    private fb: FormBuilder,
    private is: ItemService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.potion = navigation.extras.state['potion'];
    }

    this.ar.params.subscribe(params => {
      this.campaignId = params['id'];

      if (this.campaignId) {
        this.potionDetailsForm = this.fb.group({
          campaignId: [this.campaignId, Validators.required],
          name: [this.potion.name, Validators.required],
          description: [this.potion.description, Validators.required],
          effect: [this.potion.effect, Validators.required]
        });

        this.potionDetailsForm.patchValue(this.potion);
      }
    });  
  }

  ngOnInit(): void {
   
  }

  onSubmit(): void {
    if (!this.potionDetailsForm) {
      console.error("Potion Details Form is null.");
      return;
    }
    Object.assign(this.potion, this.potionDetailsForm.value);
    this.is.updateItem(this.potion)
    .subscribe({
      next: (data) => {
        console.log("Potion updated successfully.", data);
        this.router.navigate(['/potion', this.campaignId]);
      },
      error: (e) => console.error(e)
    });
  }
}