import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { OperationService } from './operation.service';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { NotifyService } from './notify.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { Operation } from './model';
import { By } from '@angular/platform-browser';
import {
  MatSpinner,
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';
import { OperationPipe } from './operation.pipe';

describe('AppComponent', () => {
  let operationService: { getList: (jasmine.Spy) };
  let notifyService: { openSnackbar: (str: string) => void };
  const operationList = [{ value: '2', action: 'add', secondOperand: '3' }];
  beforeEach(() => {
    operationService = jasmine.createSpyObj('OperationService', ['getList']);
    notifyService = jasmine.createSpyObj('NotifyService', ['openSnackbar']);

    TestBed.configureTestingModule({
      declarations: [AppComponent, OperationPipe],
      imports: [MatProgressSpinnerModule, MatCardModule],
      providers: [
        { provide: OperationService, useValue: operationService },
        { provide: NotifyService, useValue: notifyService },
      ],
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should show operations', () => {
    const fixture = TestBed.createComponent(AppComponent);
    operationService.getList.and.returnValue(
      cold('---x|', { x: operationList })
    );
    const app = fixture.componentInstance;
    const spinnerElement = fixture.nativeElement.querySelector('mat-spinner');
    fixture.detectChanges(); // ngOnInit()
    expect(spinnerElement).toBeDefined('shold show spinner');

    getTestScheduler().flush(); // flush the observables
    fixture.detectChanges(); // update view

    const olElements = fixture.debugElement.queryAll(By.css('.operation'));
    expect(spinnerElement).toBe(null, 'should hide snipper');
    expect(olElements.length).toBe(1, 'should show operation');
    expect(olElements[0].nativeElement.innerText).toBe('2 + 3 = 5');
  });

  it('should call notifyService.openSnackbar in case of error ', () => {
    const fixture = TestBed.createComponent(AppComponent);
    operationService.getList.and.returnValue(
      cold('--#|', null, new Error('operationService test failure'))
    );
    const spinnerElement = fixture.nativeElement.querySelector('mat-spinner');
    fixture.detectChanges();
    expect(spinnerElement).toBeDefined('should show spinner');

    getTestScheduler().flush();
    fixture.detectChanges();

    expect(notifyService.openSnackbar).toHaveBeenCalledTimes(1);
    expect(notifyService.openSnackbar).toHaveBeenCalledOnceWith('Server Error');

    expect(spinnerElement).toBe(null, 'should hide spnipper');
  });
});
