import { Injectable } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { TradingFuture } from '../../shared/models/trading-future.model';
import { TradingFutureEnum } from '../../shared/models/trading-future-interval.enum';
import { TradingFutureMinMax } from '../../shared/models/trading-future-min-max.model';
import { TradingFutureMinMaxHolder } from '../../shared/models/trading-future-min-max-holder.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class HistoricDataStorageService {
  private sources = new Subject<TradingFuture>()
  private minMaxWithIntervals: TradingFutureMinMaxHolder[] = [];
  private static readonly DATA_PULLING_INTERVAL = 5000;

  constructor() {
    this.listenComingChanges()
    // what can be improved when page will be destroyed keep data inside localStorage or indexedDB
    // restore state  when HistoricDataStorageService will be created to allow keep state after reloads
    this.startDataPulling(HistoricDataStorageService.DATA_PULLING_INTERVAL)
  }

  public setExternalFutureValue(future: TradingFuture) {
    this.sources.next(future)
  }


  private listenComingChanges() {
    //Creating Trading Future min max for different time intervals
    const interval5Min = new TradingFutureMinMax(TradingFutureEnum.FIVE_MIN)
    const intervalFifteenMin = new TradingFutureMinMax(TradingFutureEnum.FIFTEEN_MIN)
    const intervalOneHour = new TradingFutureMinMax(TradingFutureEnum.ONE_HOUR)
    const interval4Hour = new TradingFutureMinMax(TradingFutureEnum.FOUR_HOUR)
    const intervalTwentyFourHour = new TradingFutureMinMax(TradingFutureEnum.TWENTY_FOUR_HOUR)
    this.minMaxWithIntervals.push(interval5Min.getMinMaxIntervals())
    this.minMaxWithIntervals.push(intervalFifteenMin.getMinMaxIntervals())
    this.minMaxWithIntervals.push(intervalOneHour.getMinMaxIntervals())
    this.minMaxWithIntervals.push(interval4Hour.getMinMaxIntervals())
    this.minMaxWithIntervals.push(intervalTwentyFourHour.getMinMaxIntervals())
    this.sources.pipe(
      takeUntilDestroyed()
    ).subscribe(future => {
      console.log('Incoming interval >>>>>>', future.amount, future.futureDate)
      // Calculating min and max values for different intervals
      interval5Min.generateNewMinMax(future)
      intervalFifteenMin.generateNewMinMax(future)
      intervalOneHour.generateNewMinMax(future)
      interval4Hour.generateNewMinMax(future)
      intervalTwentyFourHour.generateNewMinMax(future)
    })
  }

  /**
   * To set future value from external sources
   */
  public getMinMaxForIntervals() {
    return this.minMaxWithIntervals;
  }

  /**
   * Create TradingFuture with random value with pullInterval
   * @param pullInterval data pulling interval
   * @private
   */
  private startDataPulling(pullInterval: number) {
    interval(pullInterval).pipe(
      takeUntilDestroyed())
      .subscribe(_ => {
        this.sources.next(new TradingFuture(Math.floor(Math.random() * 1000), new Date()))
      })
  }

}
