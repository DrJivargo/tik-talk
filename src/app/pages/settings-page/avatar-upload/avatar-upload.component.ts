import {Component, signal} from '@angular/core';
import {SvgIconComponent} from '../../../common-ui/svg-icon/svg-icon.component';
import {DndDirective} from '../../../common-ui/directives/dnd.directive';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-avatar-upload',
  imports: [
    SvgIconComponent,
    DndDirective,
    FormsModule
  ],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss'
})
export class AvatarUploadComponent {
  preview = signal<string>('/assets/imgs/Img.png')

  avatar: File | null = null

  fileBrowserHandler(event: Event): void {
    const file: File | undefined = (event.target as HTMLInputElement)?.files?.[0]
    this.processFiles(file)
  }

  onFileDropped(file: File): void {
    this.processFiles(file)
  }

  processFiles(file: File | null | undefined): void {
    if (!file || !file.type.match('image')) return

    const reader: FileReader = new FileReader();

    reader.onload = event => {
      this.preview.set(event.target?.result?.toString() ?? '')
    }
    reader.readAsDataURL(file);
    this.avatar = file
  }
}
