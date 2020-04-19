import { Component, Input } from '@angular/core';

@Component({
  selector: 'plopdown-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
  @Input() public path: string =
    'M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z';
}