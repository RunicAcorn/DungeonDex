import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-story',
  standalone: true,
  imports: [],
  templateUrl: './story.component.html',
  styleUrl: './story.component.css'
})
export class StoryComponent {
 
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

}
