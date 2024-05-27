import { Component, OnInit } from '@angular/core';
import { SceneService } from '../scene.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, of, switchMap, tap } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { Statement } from '../statement';



@Component({
  selector: 'app-scene-display',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scene-display.component.html',
  styleUrl: './scene-display.component.css'
})
export class SceneDisplayComponent implements OnInit, OnDestroy{

  sceneId!: number;
  chapterId!: number;


  //For narrative
  narrative: string[] = [];
  newNarrative = '';
  result = '';
  order = 0;


  //For Dialogue
  //Pull in statements from API and adjust the order, be sure to plug the latest number in the order variable
  // Get the statemnents not the dialogue
  statements: Statement[] = [];
  speakers: string[] = ["Player1", "Player2", "NPC1", "NPC2"];
  selectedSpeaker: string = '';

  newMessage = '';
  
  sendMessage() {
    // add the new message to the messages array
    this.statements.push({ speaker: this.selectedSpeaker, text: this.newMessage, order: this.order++, dialogueId: this.sceneId });
  
    // clear the newMessage input
    this.newMessage = '';
  }



  description!: string;

  constructor(
    private sceneService: SceneService,
    private route: ActivatedRoute,
    private router: Router,
 
  ) { 
  
  
  }

    ngOnInit(): void {
      this.route.params.subscribe(params => {
       
        this.sceneId = params['sceneid'];

        this.sceneService.getSceneById(this.sceneId).pipe(
          tap(data => {
            console.log(data);
            this.chapterId = data.chapterId;
            this.description = data.description;
          }),
          switchMap(data => 
            this.description.toUpperCase() === "DIALOGUE" ? this.sceneService.getStatements(this.sceneId) : of(data)
          )
        ).subscribe({
          next: (result) => {
            if (this.description.toUpperCase() === "NARRATIVE" && result.events) {
              this.narrative = result.events.$values;
            } else if (this.description.toUpperCase() === "DIALOGUE") {
              this.selectedSpeaker = this.speakers[0];
              this.statements = result.$values[0].dialogue.statements.$values; // assuming getDialogue() returns the dialogue
            }
          },
          error: (err) => {
            console.error('Error:', err);
          }
        });
        // Use this.campaignId to fetch campaign details from the API

        console.log("Values: scene: " + this.sceneId + " chapter: " + this.chapterId);
        this.sceneService.getSceneById(this.sceneId);

  
        
      });


   
  }

  ngOnDestroy(): void {
   

  }

  saveDialogueClick() : void {
    this.saveDialogue().subscribe({
      next: (response) => {
        this.result = 'Dialogue saved successfully!';
      },
      error: (err) => {
        this.result = 'Error saving dialogue: ' + err;

      }
    });
  }

  saveDialogue(): Observable<any> {
    // replace the URL with the actual URL of your server
    console.log("trying to save dialogue");
    return this.sceneService.updateDialogue(this.statements, this.sceneId);
  }

 returnToScenes(){
  
  this.router.navigate(['/chapter', this.chapterId]);
 }
 addNext(){
  
  this.router.navigate(['/chapter', this.chapterId]);
 }
  
 addNarrative(){
  

  this.saveNarrative(this.newNarrative).subscribe({
    next: (response) => {
      this.result = 'Narrative saved successfully!';
      this.narrative.push(this.newNarrative);
      this.newNarrative = '';

    }
  }
  
  );


 }

 saveNarrative(narrative: string): Observable<any> {
  // replace the URL with the actual URL of your server
  return this.sceneService.updateNarrative(narrative,this.sceneId);
}

}


  

