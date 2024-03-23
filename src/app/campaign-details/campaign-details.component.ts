import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-campaign-details',
  standalone: true,
  imports: [],
  templateUrl: './campaign-details.component.html',
  styleUrl: './campaign-details.component.css'
})
export class CampaignDetailsComponent implements OnInit {

  campaignId!: number;

  constructor( private router : Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.campaignId = params['id'];
      // Use this.campaignId to fetch campaign details from the API
    });

  }

  story(campaignId: number): void {

    this.router.navigate(["/story", campaignId])
   
    
  }
  codex(campaignId: number): void {

    this.router.navigate(["/codex", campaignId]);
    
  }
  tools(campaignId: number): void {

    this.router.navigate(["/tools", campaignId]);
    
  }
  backToCampaignList(): void{
    this.router.navigate(["/menu"]);
  }

}
