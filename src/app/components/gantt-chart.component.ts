import { Component, inject, OnInit, ViewChild, Input } from '@angular/core';
import {
  registerParser, registerExporter,
  newInstance, BrowserUIModel
} from "@visuallyjs/browser-ui";

import { GanttParser } from "../gantt/parser";
import { GANTT } from "../gantt/constants";
import { GanttExporter } from "../gantt/exporter";

import {
    SurfaceComponent, VisuallyJsModule
} from "@visuallyjs/browser-ui-angular";

import { subtaskDataset } from "../gantt/data-generator";
import { GanttService } from "../gantt.service";
import { generateView } from "../view";
import { createRenderOptions } from "../gantt/render-options";
import modelOptions from "../gantt/model-options";
import { Gantt } from "../gantt/gantt";
import { GanttOptions } from '../gantt/defs';

@Component({
  selector: 'app-gantt-chart',
  template: `
    <vjs-surface [viewOptions]="viewOptions"
                 [renderOptions]="renderOptions"
                 [model]="model"
                 class="vjs-gantt-canvas">
    </vjs-surface>
  `,
  standalone: true,
  imports: [VisuallyJsModule]
})
export class GanttChartComponent implements OnInit {
  private ganttService = inject(GanttService);

  @ViewChild(SurfaceComponent) surfaceComponent!: SurfaceComponent;

  @Input() labels: any;
  @Input() options!: GanttOptions;

  model: BrowserUIModel = newInstance(modelOptions);
  viewOptions: any;
  renderOptions: any;

  ngOnInit() {
    registerParser(GANTT, GanttParser);
    registerExporter(GANTT, GanttExporter);

    // Initialize Gantt logic
    const gantt = new Gantt(this.options || {}, this.model, () => this.surfaceComponent?.surface);

    // Store in service
    this.ganttService.setGantt(gantt);

    // Setup view and render options
    this.viewOptions = generateView(gantt);
    this.renderOptions = createRenderOptions(gantt);

      // Initial load
      gantt.load(subtaskDataset());
  }
}
