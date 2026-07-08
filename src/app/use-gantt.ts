import {Gantt} from "./gantt/gantt";
import {effect, Signal, WritableSignal} from "@angular/core";
import {DayEntry, LabelEntry, TimelineHeaderEntry} from "./gantt/defs";

/**
 * A hook that exposes as signals several of the Gantt chart's properties.
 * @param gantt
 * @param p
 */
export function useGantt(gantt:Signal<Gantt|null>, p:{
    headerSize?:WritableSignal<number>, labels?:WritableSignal<Array<LabelEntry>>,
    dayRange?:WritableSignal<number>,
    headers?:WritableSignal<Array<TimelineHeaderEntry>>,
    days?:WritableSignal<Array<DayEntry>>,
    rightNow?:WritableSignal<number>
}) {

    const repaint = () => {
        const g = gantt();
        if (g) {
            p.headerSize && p.headerSize.set(g.headerSize);
            p.labels && p.labels.set([...g.labels]);
            p.dayRange && p.dayRange.set(g.dayRange)
            p.headers && p.headers.set(g.headers)
            p.rightNow && p.rightNow.set(g.rightNow)
            p.days && p.days.set(g.days)
        }
    }

    effect(() => {
        const g = gantt();
        if (g) {
            g.bind('update', repaint);
            repaint();
            return () => g.unbind('update', repaint);
        }
        return;
    });
}
