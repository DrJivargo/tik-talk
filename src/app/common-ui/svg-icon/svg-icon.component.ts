import {Component, Input} from '@angular/core';

@Component({
  selector: 'svg[icon]',
  standalone: true,
  imports: [],
  template: '<svg:use [attr.href]="href"></svg:use>',
  styles: ['']
})
export class SvgIconComponent {
  @Input() icon = ''

  get href(): string {
    return `/assets/svg/${this.icon}.svg#${this.icon}`;
  }
}
