import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image-generator',
  standalone: true,
  imports: [],
  templateUrl: './image-generator.component.html',
  styleUrl: './image-generator.component.css'
})
export class ImageGeneratorComponent implements OnInit{

  campaignId!: number;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void
  {
    this.activatedRoute.params.subscribe(params => {
      this.campaignId = params['id'];
      // Use this.campaignId to fetch campaign details from the API
    });
  }

  backToTools(): void{

    this.router.navigate(['/tools', this.campaignId])
  }

}
