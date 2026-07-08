import { Injectable, signal, Signal } from '@angular/core';
import { Gantt } from './gantt/gantt';

/**
 * Service for injecting Gantt instance into various components.
 */
@Injectable({
  providedIn: 'root'
})
export class GanttService {
  private _gantt = signal<Gantt | null>(null);

  readonly gantt: Signal<Gantt | null> = this._gantt.asReadonly();

  setGantt(gantt: Gantt) {
    this._gantt.set(gantt);
  }
}
