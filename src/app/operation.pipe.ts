import { Pipe, PipeTransform } from '@angular/core';
import { Operation, Actions } from './model';

@Pipe({
  name: 'operation',
})
export class OperationPipe implements PipeTransform {
  transform(operation: Operation, ...args: unknown[]): string {
    if (operation) {
      const operationPresentation = `${operation.value} ${
        Actions[operation.action]
      } ${operation.secondOperand}`;
      return operationPresentation + ' = ' + eval(operationPresentation);
    } else { return '<MISSING DATA>'; }
  }
}
