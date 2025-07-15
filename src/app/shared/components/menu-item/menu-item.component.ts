import { Component, EventEmitter, Input } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'menu-item',
  styleUrl: './menu-item.component.scss',
  templateUrl: './menu-item.component.html',
  standalone: true,
})
export class MenuItemComponent {
  @Input() sortAttrib: string | null = null;
  @Input() sortClicked = new EventEmitter<string>();
  constructor(private api_service: ApiService) {}
  handleClick() {
    if (this.sortAttrib) {
      this.sortClicked.emit(this.sortAttrib);
    }
  }
}
