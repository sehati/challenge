import { Observable } from 'rxjs';
export class Operation {
  value: number;
  action: keyof typeof Actions;
  secondOperand?: number;
  constructor(input: Operation) {
    this.value = input.value;
    this.action = input.action;
    this.secondOperand = input.secondOperand;
  }
}

export const Actions = {
  add: '+',
  multiply: '*',
};
