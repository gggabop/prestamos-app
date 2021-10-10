import { SpinnerService } from './spinner.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
 <div class="superOverlay" *ngIf="isLoading$ | async">
 <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>`,
  styleUrls: ['spinner.component.scss'],
})
export class SpinnerComponent {
isLoading$ = this.spinnerSvc.isLoading$;
  constructor( private spinnerSvc: SpinnerService) {}
}
