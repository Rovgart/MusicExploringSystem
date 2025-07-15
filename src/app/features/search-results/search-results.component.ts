import { Component, input, Input } from '@angular/core';
import { SongRequestT } from '../songs-card-list/songs-card-list';
import { SongI } from '../songs-card-list/songs-card-list';
import { SearchItemComponent } from '../search-item/search-item.component';
@Component({
  selector: 'app-search-results',
  imports: [SearchItemComponent],
  styleUrl: './search-results.component.scss',
  templateUrl: './search-results.component.html',
})
export class SearchResultsComponent {
  @Input() searchResults!: SongI[];
  @Input() isLoading!: boolean;
}
