import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-codex',
  standalone: true,
  imports: [],
  templateUrl: './codex.component.html',
  styleUrl: './codex.component.css'
})
export class CodexComponent {

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

  toMonsters(): void{
    this.router.navigate(['/monsters', this.campaignId])
  }

}


