import { Component } from '@angular/core';
import { BAR_HEIGHT } from '../gantt/constants';
import { BaseNodeComponent } from "@visuallyjs/browser-ui-angular";

@Component({
  selector: 'app-gantt-milestone',
  template: `
    <div class="vjs-gantt-milestone" data-vjs-target="true"
         [style.left.px]="data.left"
         [style.width.px]="BAR_HEIGHT"
         [style.height.px]="BAR_HEIGHT"
         data-vjs-y-resize="false"
         data-vjs-x-resize="false">
        <div class="vjs-gantt-milestone-body" [style.backgroundColor]="data.color"></div>
        <div class="vjs-gantt-connect" data-vjs-source="true">+</div>
    </div>
  `,
  standalone: true,
  imports: []
})
export class MilestoneComponent extends BaseNodeComponent {
  BAR_HEIGHT = BAR_HEIGHT;
}
