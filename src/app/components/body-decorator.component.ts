import { Component, inject, signal } from '@angular/core';
import { GanttService } from '../gantt.service';
import { DayEntry } from '../gantt/defs';
import {VisuallyJsModule} from '@visuallyjs/browser-ui-angular';
import {useGantt} from "../use-gantt";

@Component({
  selector: 'app-gantt-body-decorator',
  template: `
    <vjs-decorator placement="fixed" [position]="{x:0, y:0}">
        @if (gantt(); as g) {
            <div class="vjs-gantt-day-stripes">
                @for (day of days(); track day.id) {
                    <div [class]="day.clazz"
                         [style.flexBasis.px]="day.size" [style.height.px]="day.height"></div>
                }
            </div>
        }
    </vjs-decorator>
    <vjs-decorator placement="fixed" [position]="{x:0, y:0}">
        @if (gantt(); as g) {
            <div class="vjs-gantt-right-now"
                 [style.left.px]="rightNowLine()"
                 [style.height.px]="g.model.getNodes().length * g.rowHeight"></div>
        }
    </vjs-decorator>
  `,
  standalone: true,
  imports: [VisuallyJsModule]
})
export class GanttBodyDecoratorComponent {
  private ganttService = inject(GanttService);

  gantt = this.ganttService.gantt;
  days = signal<Array<DayEntry>>([]);
  rightNowLine = signal(0);

  constructor() {
      useGantt(this.gantt, {
          rightNow:this.rightNowLine,
          days:this.days
      })
  }
}
