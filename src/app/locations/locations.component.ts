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
      this.getLocation(this.campaignId);

      this.ls.getLocationByCampaignId(this.campaignId)
      .subscribe({
        next: (data) => this.locations = data,
        error: (e) => console.error(e)
      });
    }
    
);
  }

  getLocation(campaignId: number): void {
    this.ls.getLocationByCampaignId(campaignId).subscribe(locations => {
      this.locations = locations;
    });
  }

  selectLocation(selected: Location): void {
    console.log("Selected location: " + selected);
    this.router.navigate(['/location/select', this.campaignId], {state: {monster: selected}});
  }

  addLocation(): void {
    this.router.navigate(['/location/add', this.campaignId]);
  }

  deleteLocation(selectedDelete: Location): void {
    /*
    this.ms.deleteMonster(monster).subscribe({
      next: () => this.monsters = this.monsters.filter(m => m.id !== monster.id),
      error: (e) => console.error(e)
    });
    */
  }


  backToCodex(): void {
    this.router.navigate(['/codex', this.campaignId]);
  }

}
