import { Component, Input } from '@angular/core';
import { BAR_HEIGHT } from '../gantt/constants';
import { BaseNodeComponent } from "@visuallyjs/browser-ui-angular";

@Component({
  selector: 'app-gantt-task',
  template: `
    <div class="vjs-gantt-task" data-vjs-target="true"
         [style.left.px]="data.left"
         [style.width.px]="data.size"
         [style.height.px]="BAR_HEIGHT"
         [style.backgroundColor]="data.color"
         data-vjs-y-resize="false"
         [attr.data-vjs-show-progress]="showProgress">
        <div class="vjs-gantt-progress-value">{{ data.progress }}</div>
        <div class="vjs-gantt-progress-gauge" [style.width.%]="data.progress"></div>
        <div class="vjs-gantt-connect" data-vjs-source="true">+</div>
    </div>
  `,
  standalone: true,
  imports: []
})
export class TaskComponent extends BaseNodeComponent {
  @Input() showProgress: boolean = false;
  BAR_HEIGHT = BAR_HEIGHT;
}
