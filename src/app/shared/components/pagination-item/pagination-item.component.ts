import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination-item',
  styleUrl: './pagination-item.component.scss',
  templateUrl: './pagination-item.component.html',
})
export class PaginationItemComponent {
  @Input() page!: number;
}
