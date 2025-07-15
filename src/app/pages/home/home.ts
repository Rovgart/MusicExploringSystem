import { Component } from '@angular/core';
import { MenuComponent } from '../../features/menu/menu.component';
import { SongsCardList } from '../../features/songs-card-list/songs-card-list';
import { SearchComponent } from '../../features/search/search.component';
import { Content } from '../../shared/layout/content/content';
import { InfiniteScrollComponent } from '../../features/infinite-scroll/infinite-scroll.component';

@Component({
  selector: 'app-home',
  imports: [
    MenuComponent,
    InfiniteScrollComponent,
    SearchComponent,
    Content,
    InfiniteScrollComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
