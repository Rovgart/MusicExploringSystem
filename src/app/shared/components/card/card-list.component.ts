import { Component, Input } from '@angular/core';
import { CardItemComponent } from '../card-item/card-item.component';
import { CommonModule } from '@angular/common';

import { SongI } from '../../../features/songs-card-list/songs-card-list';

@Component({
  templateUrl: './card-list.component.html',
  imports: [CommonModule, CardItemComponent],
  selector: 'app-card-list',
  styleUrl: './card-list.component.scss',
  standalone: true,
})
export class CardListComponent {
  @Input() items: SongI[] = [];
  trackById(item: SongI): number {
    return item.id;
  }
}
