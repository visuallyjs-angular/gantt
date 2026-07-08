import { Component, inject } from '@angular/core';
import { GanttControlsComponent } from './components/controls.component';
import { GanttLabelsComponent } from './components/labels.component';
import { GanttHeadersComponent } from './components/headers.component';
import { GanttBodyDecoratorComponent } from './components/body-decorator.component';
import { GanttChartComponent } from './components/gantt-chart.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="vjs-gantt-main">
          <app-gantt-controls></app-gantt-controls>
          <div class="vjs-gantt-body">
              <app-gantt-labels></app-gantt-labels>
              <div class="vjs-gantt-body-content">
                  <app-gantt-headers></app-gantt-headers>
                  <app-gantt-chart></app-gantt-chart>
              </div>
              <app-gantt-body-decorator></app-gantt-body-decorator>
          </div>
    </div>
  `,
  standalone: true,
  imports: [
    GanttControlsComponent,
    GanttLabelsComponent,
    GanttHeadersComponent,
    GanttBodyDecoratorComponent,
    GanttChartComponent
  ]
})
export class AppComponent { }
