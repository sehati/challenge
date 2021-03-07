import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { OperationPipe } from './operation.pipe';
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
  declarations: [AppComponent, OperationPipe],
  imports: [
    CommonModule,
    BrowserModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
