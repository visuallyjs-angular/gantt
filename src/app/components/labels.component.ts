import {Component, inject, signal} from '@angular/core';
import { GanttService } from '../gantt.service';
import { LabelEntry } from '../gantt/defs';
import { TYPE_TASK_GROUP } from '../gantt/constants';
import {VisuallyJsService, useZoom} from "@visuallyjs/browser-ui-angular";
import {useGantt} from "../use-gantt";

@Component({
  selector: 'app-gantt-labels',
  template: `
    @if (gantt(); as g) {
        <div class="vjs-gantt-task-labels-container">
            <div class="vjs-gantt-task-labels">
                <div [style.height.px]="headerSize()" style="top:0; background-color:white; position:sticky;"></div>
                @for (entry of entries(); track entry.id) {
                    <div [attr.data-vjs-type]="entry.type" class="vjs-gantt-task-label"
                         [style.height.px]="g.rowHeight * zoom()" [style.marginLeft.rem]="entry.indent">
                        @if (entry.type === TYPE_TASK_GROUP) {
                            <div class="vjs-gantt-task-group-toggle" (click)="g.toggleCollapse(entry.id)">
                                {{ entry.collapsed ? '+' : '-' }}
                            </div>
                        }
                        {{ entry.name }}
                        <div class="vjs-gantt-task-label-controls">
                            <div class="vjs-gantt-task-label-edit" (click)="$event.stopPropagation(); g.editTask(entry.id)">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
                            </div>
                            <div class="vjs-gantt-task-label-delete" (click)="$event.stopPropagation(); g.removeTask(entry.id)">
                                ×
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    }
  `,
  standalone: true,
  imports: []
})
export class GanttLabelsComponent {
  private ganttService = inject(GanttService);
  private $vjs:VisuallyJsService = inject(VisuallyJsService)

  gantt = this.ganttService.gantt;
  entries = signal<Array<LabelEntry>>([]);
  headerSize = signal(0);
  surface = this.$vjs.surface

  zoom = useZoom()

  TYPE_TASK_GROUP = TYPE_TASK_GROUP;
  constructor() {
      useGantt(this.gantt, {headerSize:this.headerSize, labels:this.entries})
  }
}
