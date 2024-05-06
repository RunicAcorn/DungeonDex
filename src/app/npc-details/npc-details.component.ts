import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormsModule, Validators, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NPCService } from '../npc.service';
import { NPC } from '../npc';

@Component({
  selector: 'app-npc-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './npc-details.component.html',
  styleUrls: ['./npc-details.component.css']
})
export class NPCDetailsComponent implements OnInit {
  npcDetailsForm: FormGroup = new FormGroup({});
  campaignId!: number;
  npc!: NPC;

  constructor(
    private ar: ActivatedRoute, 
    private router: Router, 
    private fb: FormBuilder,
    private ns: NPCService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.npc = navigation.extras.state['NPC'];
    }

    this.ar.params.subscribe(params => {
      this.campaignId = params['id'];

      if (this.campaignId) {
        this.npcDetailsForm = this.fb.group({
          campaignId: [this.campaignId, Validators.required],
          name: [this.npc.name, Validators.required],
          race: [this.npc.race, Validators.required],
          age: [this.npc.age, Validators.required],
          description: [this.npc.description],
          notes: [this.npc.notes]
        });

        this.npcDetailsForm.patchValue(this.npc);
      }
    });  
  }

  ngOnInit(): void {}

  onSubmit(): void {
    Object.assign(this.npc, this.npcDetailsForm.value);
    this.ns.updateNPC(this.npc)
    .subscribe({
      next: (data) => {
        console.log("NPC updated successfully.", data);
        this.router.navigate(['/npc', this.campaignId]);
      },
      error: (e) => console.error(e)
    });
  }
}