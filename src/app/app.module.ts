import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { HistoricalDataStorageComponent } from './historical-data-storage/historical-data-storage.component';

@NgModule({
  declarations: [
    AppComponent,
    HistoricalDataStorageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
