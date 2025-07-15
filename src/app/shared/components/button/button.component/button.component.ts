// button.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  standalone: true,
})
export class ButtonComponent {
  @Input() type: 'submit' | 'button' | 'reset' = 'button';
  @Input() name: string = 'Button';
  @Input() leftIcon: string | null = null;
  @Input() rightIcon: string | null = null;
  @Input() variant: 'basic' | 'raised' | 'stroked' | 'flat' = 'raised';
  @Input() color: 'primary' | 'accent' | 'warn' | '' = 'primary';
  @Input() disabled: boolean = false;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() isPlaying: 'Play' | 'Pause' = 'Pause';
  @Input() togglePlay: () => void = () => {};
  @Input() play: () => void = () => {};
}
