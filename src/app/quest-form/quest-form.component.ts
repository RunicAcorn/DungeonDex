import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Quest } from '../quest';
import { QuestService } from '../quest.service';
import { Location } from '../location'; // Assuming you have a Location interface

@Component({
  selector: 'app-quest-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quest-form.component.html',
  styleUrls: ['./quest-form.component.css']
})
export class QuestFormComponent implements OnInit {
  quest!: Quest;
  
  campaignId!: number;

  constructor( private ar: ActivatedRoute, private qs: QuestService, private router: Router) { }

  ngOnInit(): void {
    this.ar.params.subscribe(params => {

      this.campaignId = params['id'];

      this.quest = {
        campaignId: this.campaignId,
        name: '',
        objective: '',
        
      }
      console.log("quest is", this.quest);
    });
  }

  submitQuest(): void {
    this.qs.createQuest(this.quest).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/quest', this.campaignId]);
      },
      error: (e) => console.error(e)
    });
  }
}