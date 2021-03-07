import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { Operation, Actions } from './model';
import { combineLatest } from 'rxjs';

const localUrl = 'assets/';

@Injectable({
  providedIn: 'root',
})
export class OperationService {
  constructor(private httpClient: HttpClient) {}

  /**
   * You can find a list of operations and values in numbers.json.
   * Each object in this json will contain a value and an action,
   * which is the name of another json you have to query to get the second value to perform the action.
   */
  public getList(): Observable<Array<Operation>> {
    return this.httpClient.get(localUrl + 'numbers.json').pipe(
      concatMap((operations: Array<Operation>) => {
        const list: Array<Observable<Operation>> = [];
        for (const operation of operations) {
          list.push(
            this.httpClient.get(localUrl + operation.action + '.json').pipe(
              map((operand: { value: number }) => {
                return new Operation({
                  ...operation,
                  secondOperand: operand.value,
                });
              }),
              catchError((err) => of(undefined))
            )
          );
        }
        return combineLatest(list);
      })
    );
  }
}
