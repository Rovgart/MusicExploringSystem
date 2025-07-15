import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationItemComponent } from '../pagination-item/pagination-item.component';
import { PaginationSkeletonComponent } from '../../skeletons/pagination-skeleton.component';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  imports: [PaginationItemComponent, PaginationSkeletonComponent],
  standalone: true,
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() page!: number;
  @Input() total_pages!: number;
  @Input() hasNext!: boolean;
  @Input() hasPrev!: boolean;
  @Input() status: 'loading' | 'error' | 'success' = 'loading';
  @Output() pageChange = new EventEmitter<number>();

  goToPage(newPage: number) {
    this.pageChange.emit(newPage);
  }
  getPageNumbers(): number[] {
    return Array.from({ length: this.total_pages }, (_, i) => i + 1);
  }
}
