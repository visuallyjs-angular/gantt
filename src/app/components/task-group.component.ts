import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BAR_HEIGHT } from '../gantt/constants';
import { BaseNodeComponent } from "@visuallyjs/browser-ui-angular";

@Component({
  selector: 'app-gantt-task-group',
  template: `
    <div class="vjs-gantt-task-group" data-vjs-target="true"
         [style.left.px]="data.left"
         [style.width.px]="data.size"
         [style.height.px]="BAR_HEIGHT"
         [style.backgroundColor]="data.color"
         data-vjs-resizable="false"
         [attr.data-vjs-not-draggable]="true">
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class TaskGroupComponent extends BaseNodeComponent {
  BAR_HEIGHT = BAR_HEIGHT;
}
