import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChapterService } from '../chapter.service'; // Update the path as necessary
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-create-chapter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-chapter.component.html',
  styleUrl: './create-chapter.component.css'
})
export class CreateChapterComponent implements OnInit {

  campaignId! : number;
  chapterForm: FormGroup;
  

  constructor(
    private fb: FormBuilder, 
    private chapterService: ChapterService,
    private activatedRoute: ActivatedRoute, 
    private router: Router ) {

      this.chapterForm = this.fb.group({
        campaignId: ['', Validators.required],
        title: ['', Validators.required],
        order: ['', Validators.required]
      }); 
    }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.campaignId = params['id'];
      // Use this.campaignId to fetch campaign details from the API
      this.chapterService.getChaptersByCampaignId(this.campaignId);
      this.chapterForm.patchValue({campaignId: this.campaignId});
    });
  }

  onSubmit(): void {
    if (this.chapterForm.valid) {
      this.chapterService.addChapter(this.chapterForm.value)
        .subscribe({
          next: (res) => 
          {
            console.log("Chapter added successfully.", res.message);
            const chapterId = res.id;
            this.router.navigate(['/chapter', chapterId]);
          },
          error: (err) => console.error("Error adding chapter: ", err)
        });
    }
  }
}