import { Component, HostBinding, Input } from '@angular/core';
import { IconComponent } from '../src/lib/icon/icon.component';

@Component({
  selector: 'plopdown-icon',
  template: 'mock-plopdown-icon',
})
export class MockIconComponent implements Partial<IconComponent> {
  @HostBinding('class.icon') public iconClass: string;
  @Input() public path: string;
  @Input() public spin: boolean;
}
