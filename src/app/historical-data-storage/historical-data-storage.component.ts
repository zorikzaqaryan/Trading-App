import { Component } from '@angular/core';
import { HistoricDataStorageService } from './service/historical-data-storage.service';
import { TradingFutureMinMaxHolder } from '../shared/models/trading-future-min-max-holder.model';
import { TradingFuture } from '../shared/models/trading-future.model';

@Component({
  selector: 'app-historical-data-storage',
  templateUrl: './historical-data-storage.component.html',
  styleUrls: ['./historical-data-storage.component.css']
})
export class HistoricalDataStorageComponent {
  public intervals: TradingFutureMinMaxHolder[] = [];

  constructor(private historicDataStorageService: HistoricDataStorageService) {
    this.intervals = historicDataStorageService.getMinMaxForIntervals();
  }

  addPrice(price: any) {
    if (price.value) {
      this.historicDataStorageService.setExternalFutureValue(new TradingFuture(price.value, new Date()))
    }
    price.value = '';
  }
}
