import { Component, Input } from '@angular/core';
import { SongI } from '../../../features/songs-card-list/songs-card-list';
import { RouterLink } from '@angular/router';

@Component({
  templateUrl: './card-item.component.html',
  selector: 'app-card-item',
  imports: [RouterLink],
  styleUrl: './card-item.component.scss',
})
export class CardItemComponent {
  @Input() item!: SongI;
  @Input() link!: string;
}
