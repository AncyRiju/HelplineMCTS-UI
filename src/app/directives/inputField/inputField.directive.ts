import { Directive, HostListener, ElementRef } from "@angular/core";

@Directive({
  selector: "[inputFieldValidator]",
})
export class InputFieldValidatorDirective {
  @HostListener("keypress", ["$event"]) onKeyPress(ev: any) {
    const regex = new RegExp(/^[0-9~!@#$%^&*()_+\-=\[\]{};,."`':'\\|<>\/?]*$/);
    const key = String.fromCharCode(!ev.charCode ? ev.which : ev.charCode);
    if (regex.test(key)) {
      ev.preventDefault();
    }
  }
  @HostListener("paste", ["$event"]) blockPaste(event: KeyboardEvent) {
    event.preventDefault();
  }

  @HostListener("copy", ["$event"]) blockCopy(event: KeyboardEvent) {
    event.preventDefault();
  }

  @HostListener("cut", ["$event"]) blockCut(event: KeyboardEvent) {
    event.preventDefault();
  }
}
