import { Component, OnInit } from '@angular/core';
import { SceneService } from '../scene.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-scene-display',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scene-display.component.html',
  styleUrl: './scene-display.component.css'
})
export class SceneDisplayComponent implements OnInit{

  sceneId!: number;
  chapterId!: number;


  messages = [
    { sender: 'User1', text: 'Hello!' },
    { sender: 'User2', text: 'Hi there!' },
    // add other messages as needed
  ];
  
  newMessage = '';
  
  sendMessage() {
    // add the new message to the messages array
    this.messages.push({ sender: 'User1', text: this.newMessage });
  
    // clear the newMessage input
    this.newMessage = '';
  }



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
