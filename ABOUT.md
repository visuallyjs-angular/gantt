### Gantt Chart Demo

This demo showcases a Gantt chart implementation using VisuallyJS in an Angular application.

#### How it works

The Gantt demo uses the flexible `vjs-surface` component to render tasks along a timeline. It demonstrates how VisuallyJS can be adapted for specialized timeline-based visualizations.

#### Components Used

- `vjs-surface`: The primary canvas used to render the Gantt timeline and tasks.

#### Component Options

The `vjs-surface` component is configured with three key option sets:
- `viewOptions`: Maps task data to visual timeline elements.
- `renderOptions`: Defines the layout, timeline scales, and visual styles for tasks and dependencies.
- `modelOptions`: Manages the temporal relationships and constraints between tasks.

#### Stylesheets

For the VisuallyJS components to render correctly, the following stylesheets must be included in the project (usually in `styles.css`):

```css
@import "@visuallyjs/browser-ui/css/visuallyjs.css";
@import "@visuallyjs/browser-ui-angular/css/visuallyjs-angular.css";
```
