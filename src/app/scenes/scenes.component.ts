import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SceneService } from '../scene.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-scenes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scenes.component.html',
  styleUrl: './scenes.component.css'
})
export class ScenesComponent implements OnInit{
  chapterId! : number;
  scenes: any[] = [];
  sceneId!: number;
  

  constructor(private activatedRoute: ActivatedRoute, 
    private router: Router,
    private ss: SceneService){}
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.chapterId = params['id'];
      // Use this.campaignId to fetch campaign details from the API
      console.log("Chapter ID: ", this.chapterId);
     this.getScenes();
    });
  }

  returnToChapters(){
    const campaignId = JSON.parse(sessionStorage.getItem('campaignId') || 'null');
    this.router.navigate(["/story", campaignId]);
  }

  addScene(){
    this.router.navigate(['/scene/add', this.chapterId]);
  }

  getScenes(){

    this.ss.getScenes(this.chapterId)
    .subscribe({
      next: (data) => {
        this.scenes = data;
      },
      error: (err) => console.error("Error getting scenes: ", err)
    });
  }

  

  selectScene(sceneId: number){
    
    this.router.navigate(['/chapter', this.chapterId, sceneId]);
  }

}
