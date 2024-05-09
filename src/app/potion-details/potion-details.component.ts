import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormsModule, Validators, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemService } from '../item.service';
import { Potion } from '../item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-potion-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl:   './potion-details.component.html',
  styleUrls: ['./potion-details.component.css']
})
export class PotionDetailsComponent implements OnInit {
  potionDetailsForm: FormGroup = new FormGroup({});
    campaignId!: number;
    potionId!: number;
  potion!: Potion;

  constructor(
    private ar: ActivatedRoute, 
    private router: Router, 
    private fb: FormBuilder,
    private is: ItemService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.potionId = navigation.extras.state['potion'];
    }

    
  }

  ngOnInit(): void {

    this.potionDetailsForm = this.fb.group({
      campaignId: ['', Validators.required],
      potionName: ['', Validators.required],
      potionDescription: ['', Validators.required],
      effect: ['', Validators.required]
    });

    this.ar.params.subscribe(params => {
      this.campaignId = params['id'];

      if (this.campaignId) {

        this.is.getPotionById(this.potionId).subscribe({
          next: (data: any) => {
            console.log("Data: ", data);
            this.potion = data;

         
        this.potionDetailsForm.patchValue({
          
          campaignId: this.campaignId,
          potionName: this.potion.name,
          potionDescription: this.potion.description,
          effect: this.potion.effect
       
        });
          },
          error: (e) => console.error(e)
        });
       

      
      }
    });  
   
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