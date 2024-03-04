import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { NameFetcherService } from '../namefetcher.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-name-display',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './name-display.component.html',
  styleUrl: './name-display.component.css'
})
export class NameDisplayComponent {

  
  test = '';
  name$!: Observable<any>

  constructor(private nameFetcher: NameFetcherService) {}

  ngOnInit(): void {
    this.name$ = this.nameFetcher.getNames();
    console.log(this.name$);

    this.name$.subscribe(
      (data) => {
        // Handle emitted values here
        console.log(data); // Log the emitted value to the console
        this.test = data[0].name;
      },
      (error) => {
        // Handle errors
        console.error(error);
      },
      () => {
        // Handle completion
        console.log('Observable completed');
      }
    );
  }


}
