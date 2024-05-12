import { Component, OnInit } from '@angular/core';
import { SceneService } from '../scene.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scene-display',
  standalone: true,
  imports: [],
  templateUrl: './scene-display.component.html',
  styleUrl: './scene-display.component.css'
})
export class SceneDisplayComponent implements OnInit{

  sceneId!: number;
  chapterId!: number;

  description!: string;

  constructor(
    private sceneService: SceneService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
  
  
  }

    ngOnInit(): void {
      this.route.params.subscribe(params => {
       
        this.sceneId = params['sceneid'];


        this.sceneService.getSceneById(this.sceneId).subscribe({
          next: (data) => {
            console.log(data);
            this.chapterId = data.chapterId;
            this.description = data.description;
          },
          error: (err) => console.error("Error getting scene: ", err)
        
        })
        // Use this.campaignId to fetch campaign details from the API

        console.log("Values: scene: " + this.sceneId + " chapter: " + this.chapterId);
        this.sceneService.getSceneById(this.sceneId);
        
      });


   
  }

 returnToScenes(){
  
  this.router.navigate(['/chapter', this.chapterId]);
 }
 addNext(){
  
  this.router.navigate(['/chapter', this.chapterId]);
 }
  
}
