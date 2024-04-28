import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '../location';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-location-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './location-form.component.html',
  styleUrl: './location-form.component.css'
})
export class LocationFormComponent implements OnInit{
  location!: Location;
  campaignId!: number;

  constructor( private ar: ActivatedRoute, private ls:LocationService, private router: Router) { }

  ngOnInit(): void {
    this.ar.params.subscribe(params => {

      this.campaignId = params['id'];

      this.location = {
        campaignId: this.campaignId,
        name: '',
        description: '',
        plane: ''

      }
    } );
  }

  submitMonster(): void {
    this.ls.addLocation(this.location).subscribe({
      next: (data) => {console.log(data)
        this.router.navigate(['/location', this.campaignId])},
      error: (e) => console.error(e)
    });



}
}