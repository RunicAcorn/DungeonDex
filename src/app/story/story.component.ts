import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChapterService } from '../chapter.service';
import { CommonModule } from '@angular/common';
import { Chapter } from '../chapter.interface';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateChapterComponent } from '../create-chapter/create-chapter.component';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CreateChapterComponent],
  templateUrl: './story.component.html',
  styleUrl: './story.component.css'
})
export class StoryComponent {
 
  campaignId!: number;
  chapters: Chapter[] = [];
  
  constructor
  (
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private chapterService: ChapterService
  ) {}

  ngOnInit(): void
  {
    this.activatedRoute.params.subscribe(params => {
      this.campaignId = params['id'];
      // Use this.campaignId to fetch campaign details from the API
      this.chapterService.getChaptersByCampaignId(this.campaignId)
      .subscribe({
        next: (data) => this.chapters = data,
        error: (e) => console.error(e)
      });

    });
    
   
    


  }
  backToCampaignList(): void{

    this.router.navigate(['/campaign', this.campaignId])
  }

  addChapter(): void{
    this.router.navigate(['/chapter/add', this.campaignId])
  }

  selectChapter(chapterId: number): void {
    this.router.navigate(['chapter/', chapterId])
  }

  confirmDelete(chapterId: number): void {
    if (confirm("Are you sure you want to delete this chapter?")) {
      this.chapterService.deleteChapter(this.campaignId, chapterId)
        .subscribe({
          next: () => {
            // Remove the deleted chapter from the list
            this.chapters = this.chapters.filter(c => c.chapterId !== chapterId);
          },
          error: (error) => {
            console.error('Error deleting chapter:', error);
          }
        });
    }
  }

}
