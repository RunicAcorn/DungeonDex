import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scenes',
  standalone: true,
  imports: [],
  templateUrl: './scenes.component.html',
  styleUrl: './scenes.component.css'
})
export class ScenesComponent implements OnInit{
  chapterId! : number;

  constructor(private activatedRoute: ActivatedRoute){}
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.chapterId = params['id'];
      // Use this.campaignId to fetch campaign details from the API
     
    });
  }

}
