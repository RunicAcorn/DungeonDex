import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '../location';
import { LocationService } from '../location.service';


@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css'
})
export class LocationsComponent implements OnInit{
  locations: Location[] = [];
  campaignId!: number;

  constructor(private ar:ActivatedRoute, private ls:LocationService, private router: Router) {}

  ngOnInit(): void
  {
    this.ar.params.subscribe(params => {
      this.campaignId = params['id'];
      // Use this.campaignId to fetch campaign details from the API
      this.getLocations(this.campaignId);


    }
    
);
  }

  getLocations(campaignId: number): void {
    this.ls.getLocationByCampaignId(campaignId).subscribe({
      next: 
        (data: any) => {
          this.locations = data.$values;
          console.log("Locations: ", data.$values);
        }
      ,
      error: (e) => console.error(e)
    });
  }

  selectLocation(selected: Location): void {
    console.log("Selected location: " + selected);
    this.router.navigate(['/location/select', this.campaignId], {state: {location: selected}});
  }

  addLocation(): void {
    this.router.navigate(['/location/add', this.campaignId]);
  }

  deleteLocation(location: Location): void {
    
    this.ls.deleteLocation(location).subscribe({
      next: () => this.locations = this.locations.filter(l => l.id !== location.id),
      error: (e) => console.error(e)
    });
    
  }


  backToCodex(): void {
    this.router.navigate(['/codex', this.campaignId]);
  }

}
