import { Component, inject, signal } from '@angular/core';
import { GanttService } from '../gantt.service';
import { TimelineHeaderEntry } from '../gantt/defs';
import { STEP_WIDTH } from '../gantt/constants';
import {VisuallyJsService, useZoom} from "@visuallyjs/browser-ui-angular";
import {useGantt} from "../use-gantt";

@Component({
  selector: 'app-gantt-headers',
  template: `
	  <div class="vjs-gantt-timeline-container">
		  @if (gantt(); as g) {
			  <div class="vjs-gantt-timeline" [style.width.px]="dayRange() * STEP_WIDTH">
				  @for (header of headers(); track header.id) {
					  <div [class]="'vjs-gantt-timeline-row vjs-gantt-timeline-' + header.id">
						  @for (value of header.values; track value.id) {
							  <div class="vjs-gantt-timeline-entry"
								   [style.flexBasis.px]="value.size * zoom()" [style.height.px]="g.rowHeight">
								  @if (value.type === 'day') {
									  @if (g.showDayName && g.showDayNumber) {
										  <span>{{ $any(value).day }}</span><span class="vjs-gantt-day-name">{{ value.label }}</span>
									  } @else if (!g.showDayName && g.showDayNumber) {
										  <span>{{ $any(value).day }}</span>
									  } @else {
										  <span>{{ value.label }}</span>
									  }
								  } @else {
									  {{ value.label }}
								  }
							  </div>
						  }
					  </div>
				  }
			  </div>
		  }
	  </div>
  `,
  standalone: true
})
export class GanttHeadersComponent {
    private ganttService = inject(GanttService)
    private $vjs:VisuallyJsService = inject(VisuallyJsService)

    gantt = this.ganttService.gantt;
    headers = signal<Array<TimelineHeaderEntry>>([]);
    dayRange = signal(0);

    zoom = useZoom(this.$vjs.surface)

    STEP_WIDTH = STEP_WIDTH;

    constructor() {
        useGantt(this.gantt, {
            headers:this.headers,
            dayRange:this.dayRange
        })
    }
}
