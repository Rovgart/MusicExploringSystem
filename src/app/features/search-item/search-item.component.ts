import { Component, Input } from '@angular/core';
import { SongI, SongRequestT } from '../songs-card-list/songs-card-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss',
})
export class SearchItemComponent {
  constructor(private router: Router) {}
  @Input() searchedItem!: SongI;
  navigateTo(): void {
    this.router.navigate(['/song/', this.searchedItem.id]);
  }
}
