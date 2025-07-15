import { Component, Input } from '@angular/core';
import { SongI } from '../../songs-card-list/songs-card-list';
import { ButtonComponent } from '../../../shared/components/button/button.component/button.component';

@Component({
  selector: 'app-song-player',

  templateUrl: './song-player.html',
  styleUrl: './song-player.scss',
})
export class SongPlayer {
  @Input() song!: SongI | null;
}
