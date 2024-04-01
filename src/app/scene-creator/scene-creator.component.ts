import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SceneService } from '../scene.service';
import { FormGroup, FormsModule, Validators, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-scene-creator',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './scene-creator.component.html',
  styleUrl: './scene-creator.component.css'
})
export class SceneCreatorComponent {

 
  chapterId!: number;
  sceneForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, 
    private router: Router,
     private sceneService: SceneService,
     private fb: FormBuilder ) {

    this.sceneForm = this.fb.group({
      chapterId: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      order: ['', Validators.required]
  });
}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.chapterId = params['id'];
      // Use this.chapterId to fetch chapter details from the API
      this.sceneForm.patchValue({chapterId: this.chapterId});
      
    });
  }

  returnToChapters(){
    const campaignId = JSON.parse(sessionStorage.getItem('campaignId') || 'null');
    this.router.navigate(["/story", campaignId]);
  }

  addScene(){
    this.sceneService.addScene(this.sceneForm.value)
      .subscribe({
        next: (res) => {
          console.log("Scene added successfully.", res.message);
          const sceneId = res.id;
          this.router.navigate(['/chapter', this.chapterId]);
        },
        error: (err: any) => console.error("Error adding scene: ", err)
      });
  }

  


}
