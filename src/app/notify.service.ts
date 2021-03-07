import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  constructor(private snackBar: MatSnackBar) {}
  openSnackbar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
