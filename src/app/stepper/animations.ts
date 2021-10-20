import { animate, style, transition, trigger } from "@angular/animations";

export const inOut = trigger("inOutAnimation", [
  transition(":enter", [
    style({ height: 0 }),
    animate(".2s", style({ height: "*" }))
  ]),
  transition(":leave", [
    style({ height: "*" }),
    animate(".2s", style({ height: 0 }))
  ])
]);
