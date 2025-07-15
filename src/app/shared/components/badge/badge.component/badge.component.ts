import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-badge',
  imports: [],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
})
export class BadgeComponent {
  @Input() badgeText!: string;
  @Input() sortAttrib: string | null = null;
  @Output() sortClicked = new EventEmitter<string>();
  handleClick() {
    if (this.sortAttrib) {
      this.sortClicked.emit(this.sortAttrib);
    }
    console.log(this.sortAttrib);
  }
}
