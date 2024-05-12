import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dmtools',
  standalone: true,
  imports: [],
  templateUrl: './dmtools.component.html',
  styleUrl: './dmtools.component.css'
})
export class DMToolsComponent implements OnInit {

  campaignId!: number;
  
 

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void
  {
    this.activatedRoute.params.subscribe(params => {
      this.campaignId = params['id'];
      // Use this.campaignId to fetch campaign details from the API
    });
  }

  backToCampaignList(): void{

    this.router.navigate(['/campaign', this.campaignId])
  }

  toDice(): void{
    this.router.navigate(['/imageWizard', this.campaignId]);
  }

}
