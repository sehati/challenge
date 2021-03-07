import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { OperationService } from './operation.service';
import { of, Observable, throwError } from 'rxjs';
import { Operation } from './model';
import { doesNotReject } from 'assert';

describe('OpetationService', () => {
  let service: OperationService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new OperationService(httpClientSpy as any);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: OperationService, useValue: service },
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return list of operations based on numbers and actions', () => {
    const expectedNumbers = [
      { value: 1, action: 'add' },
      { value: 2, action: 'multiply' },
      // { value: 2, action: 'X' },
    ];
    const expectedAdd = { value: 5 };
    const expectedMultiply = { value: 10 };
    const expextedOperationList = [
      new Operation({ value: 1, action: 'add', secondOperand: 5 }),
      new Operation({ value: 2, action: 'multiply', secondOperand: 10 }),
      // undefined
    ];
    httpClientSpy.get.and.callFake((address) => {
      switch (address) {
        case 'assets/numbers.json':
          return of(expectedNumbers);
          break;
        case 'assets/add.json':
          return of(expectedAdd);
          break;
        case 'assets/multiply.json':
          return of(expectedMultiply);
          break;
        default:
          throwError('404 not found');
      }
    });

    service.getList().subscribe((list) => {
      expect(list).toEqual(expextedOperationList);
    }, fail);
  });
});
