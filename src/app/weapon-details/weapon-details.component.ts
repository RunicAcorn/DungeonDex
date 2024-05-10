import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormsModule, Validators, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemService } from '../item.service';
import { Weapon } from '../item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weapon-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './weapon-details.component.html',
  styleUrls: ['./weapon-details.component.css']
})
export class WeaponDetailsComponent implements OnInit {
  weaponDetailsForm: FormGroup = new FormGroup({});
  campaignId!: number;
  weaponId!: number;
  weapon!: Weapon;

  constructor(
    private ar: ActivatedRoute, 
    private router: Router, 
    private fb: FormBuilder,
    private is: ItemService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.weaponId = navigation.extras.state['weapon'];
    }
  }

  ngOnInit(): void {
    this.weaponDetailsForm = this.fb.group({
      campaignId: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      damageDice: ['', Validators.required]
    });

    this.ar.params.subscribe(params => {
      this.campaignId = params['id'];

      if (this.campaignId) {
        this.is.getWeaponById(this.weaponId).subscribe({
          next: (data: any) => {
            console.log("Data: ", data);
            this.weapon = data;

            this.weaponDetailsForm.patchValue({
              campaignId: this.campaignId,
              name: this.weapon.name,
              description: this.weapon.description,
              damageDice: this.weapon.damageDice
            });
          },
          error: (e) => console.error(e)
        });
      }
    });  
  }

  onSubmit(): void {
    if (!this.weaponDetailsForm) {
      console.error("Weapon Details Form is null.");
      return;
    }
    Object.assign(this.weapon, this.weaponDetailsForm.value);
    this.is.updateWeapon(this.weapon)
    .subscribe({
      next: (data) => {
        console.log("Weapon updated successfully.", data);
        this.router.navigate(['/item', this.campaignId]);
      },
      error: (e) => console.error(e)
    });
  }
}