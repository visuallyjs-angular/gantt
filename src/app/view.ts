

import {EVENT_TAP, PlainArrowOverlay, NodeEventCallbackPayload, EdgeEventCallbackPayload} from "@visuallyjs/browser-ui"

import {TYPE_MILESTONE, TYPE_TASK, TYPE_TASK_GROUP} from "./gantt/constants"
import { TaskComponent } from "./components/task.component";
import { TaskGroupComponent } from "./components/task-group.component";
import { MilestoneComponent } from "./components/milestone.component";
import {Gantt} from "./gantt/gantt";
import {AngularViewOptions} from "@visuallyjs/browser-ui-angular";


/**
 * Generates the view for the canvas - maps node types to components, sets up tap to select for nodes,
 * and configures edges.
 */
export function generateView(gantt:Gantt):AngularViewOptions {

    return {
        nodes:{
            selectable:{
                events:{
                    [EVENT_TAP]:(p:NodeEventCallbackPayload<any>) => {
                        p.model.setSelection(p.obj)
                    }
                }
            },
            [TYPE_TASK]:{
                component:TaskComponent,
                parent:"selectable"
            },
            [TYPE_TASK_GROUP]:{
                component:TaskGroupComponent,
                parent:"selectable"
            },
            [TYPE_MILESTONE]:{
                component:MilestoneComponent,
                parent:"selectable"
            }
        },
        edges:{
            default:{
                overlays:[
                {
                    type:PlainArrowOverlay.type,
                    options:{
                        location:1,
                        width:8,
                        length:8
                    }
                }
            ],
                events:{
                [EVENT_TAP]:(e:EdgeEventCallbackPayload) => {
                    gantt.maybeDeleteDependency(e.obj)
                }
            }
        }
    }
}

}
