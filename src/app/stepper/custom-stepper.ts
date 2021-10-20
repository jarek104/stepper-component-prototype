import { Directionality } from "@angular/cdk/bidi";
import { hasModifierKey } from "@angular/cdk/keycodes";
import { CdkStepper } from "@angular/cdk/stepper";
import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  Input
} from "@angular/core";
import { inOut } from "./animations";

export type StepState = "active" | "done" | "untouched";

export const STEP_STATE = {
  ACTIVE: "active",
  DONE: "done",
  UNTOUCHED: "untouched"
};

@Component({
  selector: "custom-stepper",
  templateUrl: "./custom-stepper.html",
  styleUrls: ["./custom-stepper.css"],
  animations: [inOut],
  providers: [{ provide: CdkStepper, useExisting: CustomStepper }]
})
export class CustomStepper extends CdkStepper {
  @Input() vertical = false;

  circlesFocusable = false;
  focusedCircleIndex = 0;

  onClick(index: number): void {
    this.selectedIndex = index;
  }

  isNextCompleted(index: number) {
    if (this.steps.toArray().length <= index + 1) {
      return false;
    }
    return this.steps.toArray()[index + 1].completed;
  }

  isNextUntouched(index: number) {
    if (this.steps.toArray().length <= index + 1) {
      return false;
    }
    return !this.steps.toArray()[index + 1].interacted;
  }

  _keydown(event: KeyboardEvent) {
    this.circlesFocusable = true;

    if (this.vertical === false) {
      if (event.keyCode === 39) {
        this.focusedCircleIndex++;
      }
      if (event.keyCode === 37) {
        this.focusedCircleIndex--;
      }
    }
    if (this.vertical === true) {
      if (event.keyCode === 40) {
        this.focusedCircleIndex++;
      }
      if (event.keyCode === 38) {
        this.focusedCircleIndex--;
      }
    }

    if (event.keyCode === 13) {
      this.selectedIndex = this.focusedCircleIndex;
    }
  }

  _focusChange(event: any) {
    if (event === "keyboard") {
      this.circlesFocusable = true;
    } else if (event === null) {
      this.circlesFocusable = false;
    }
  }
}
