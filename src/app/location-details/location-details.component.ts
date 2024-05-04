import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormsModule, Validators, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LocationService } from '../location.service';
import { Location } from '../location';


@Component({
  selector: 'app-location-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './location-details.component.html',
  styleUrl: './location-details.component.css'
})
export class LocationDetailsComponent  implements OnInit{

  locationDetailsForm: FormGroup = new FormGroup({});
  campaignId!: number;

  location!: Location;

  constructor
  ( private ar: ActivatedRoute, 
    private router: Router, 
    private fb: FormBuilder,
  private ls: LocationService) {

    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.location = navigation.extras.state['location'];
    }

    
    this.ar.params.subscribe(params => {
      this.campaignId = params['id'];

      if (this.campaignId) {
        this.locationDetailsForm = this.fb.group({
          campaignId: [this.campaignId, Validators.required],
          name: [this.location.name, Validators.required],
          description: [this.location.description, Validators.required],
          plane: [this.location.plane, Validators.required]
        });

      this.locationDetailsForm.patchValue(this.location);
    }});  


   }

  ngOnInit(): void {

   

    
  
  }

  onSubmit(): void {

    Object.assign(this.location, this.locationDetailsForm.value);
    this.ls.updateLocation(this.location)
    .subscribe({
      next: (data) => {
        console.log("Location updated successfully.", data);
        this.router.navigate(['/location', this.campaignId]);
      },
      error: (e) => console.error(e)
    });
  }
}

