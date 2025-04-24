import {Component, Input} from '@angular/core';
import {Profile} from '../../../data/interfaces/profile.interface';
import {ImgUrlPipe} from '../../../helpers/pipes/img-url.pipe';
import {Pageble} from '../../../data/interfaces/pageble.interface';

@Component({
  selector: 'app-subscrider-card',
  imports: [
    ImgUrlPipe
  ],
  templateUrl: './subscrider-card.component.html',
  styleUrl: './subscrider-card.component.scss'
})
export class SubscriderCardComponent {
  @Input() profile!: Profile;
}
