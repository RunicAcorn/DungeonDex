import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormsModule, Validators, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestService } from '../quest.service';
import { Quest } from '../quest';


@Component({
  selector: 'app-quest-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './quest-details.component.html',
  styleUrl: './quest-details.component.css'
})
export class QuestDetailsComponent  implements OnInit{

  questDetailsForm: FormGroup = new FormGroup({});
  campaignId!: number;

  quest!: Quest;
  startLocation: string = '';

  constructor
  ( private ar: ActivatedRoute, 
    private router: Router, 
    private fb: FormBuilder,
  private ls: QuestService) {

    const navigation = this.router.getCurrentNavigation();
  

    
    this.ar.params.subscribe(params => {
      this.campaignId = params['id'];
      if (navigation && navigation.extras.state) {
        this.quest = navigation.extras.state['quest'];
      } else {
        console.error("No quest found in navigation extras.");
      }
      if(this.quest.startLocation) {
        this.startLocation = this.quest.startLocation;
      }
      if (this.campaignId) {
        this.questDetailsForm = this.fb.group({
          campaignId: [this.campaignId, Validators.required],
          name: [this.quest.name, Validators.required],
          objective: [this.quest.objective, Validators.required]
        });

      this.questDetailsForm.patchValue(this.quest);
    }});  


   }

  ngOnInit(): void {

   

    
  
  }

  onSubmit(): void {

    Object.assign(this.quest, this.questDetailsForm.value);
    this.ls.updateQuest(this.quest)
    .subscribe({
      next: (data) => {
        console.log("Quest updated successfully.", data);
        this.router.navigate(['/quest', this.campaignId]);
      },
      error: (e) => console.error(e)
    });
  }
}

