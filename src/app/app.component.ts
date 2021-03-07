import { Component, OnDestroy, OnInit } from '@angular/core';
import { OperationService } from './operation.service';
import { Operation } from './model';
import { Subscription } from 'rxjs';
import { NotifyService } from './notify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'challenge-app';
  operationsList: Array<Operation>;
  hideSpinner = false;
  subscription: Subscription | undefined;

  constructor(
    private operationService: OperationService,
    private notifyService: NotifyService
  ) {}

  ngOnInit() {
    this.subscription = this.operationService.getList().subscribe(
      (operations: Array<Operation>) => {
        this.operationsList = operations;
      },
      (error) => {
        this.hideSpinner = true;
        this.notifyService.openSnackbar('Server Error');
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
