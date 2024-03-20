import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dmtools',
  standalone: true,
  imports: [],
  templateUrl: './dmtools.component.html',
  styleUrl: './dmtools.component.css'
})
export class DMToolsComponent {

  constructor(private router: Router) {}

  backToCampaignList(): void{
    this.router.navigate(["/menu"]);
  }

}
