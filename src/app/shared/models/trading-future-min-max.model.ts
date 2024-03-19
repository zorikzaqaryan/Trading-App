import { TradingFuture } from './trading-future.model';
import { TradingFutureEnum } from './trading-future-interval.enum';
import { TradingFutureMinMaxHolder } from './trading-future-min-max-holder.model';

export class TradingFutureMinMax {
  // making this  fields private to not allow changes from outside
  private tradingFutureMin = new TradingFuture(0, new Date());
  private tradingFutureMax = new TradingFuture(0, new Date());
  private incomingValue: TradingFuture = new TradingFuture(0, new Date());

  constructor(public interval: TradingFutureEnum) {
  }

  /**
   * Calculating new min max values by incoming value
   * @param incomingValue
   */
  public generateNewMinMax(incomingValue: TradingFuture) {
    this.incomingValue = incomingValue;
    this.calculateMinMaxValues();
  }

  /**
   * Will return min max values with interval for certain class
   */
  public getMinMaxIntervals() {
    return new TradingFutureMinMaxHolder(
      this.interval,
      this.tradingFutureMin,
      this.tradingFutureMax);
  }

  /**
   * Calculate min max values for given interval and update values for certain interval
   * @private
   */
  private calculateMinMaxValues() {
    let timeDiffInMin = this.getTimeDiffInMin(this.tradingFutureMax.futureDate);

    if (timeDiffInMin <= this.getIntervalInMinutes(this.interval)) {
      if (this.tradingFutureMin.amount == 0 || Number(this.tradingFutureMin.amount) > Number(this.incomingValue.amount)) {
        this.tradingFutureMin.amount = this.incomingValue.amount;
        this.tradingFutureMin.futureDate = this.incomingValue.futureDate;
      }

      if (this.tradingFutureMax.amount == 0 || Number(this.tradingFutureMax.amount) <= Number(this.incomingValue.amount)) {
        this.tradingFutureMax.amount = this.incomingValue.amount;
        this.tradingFutureMax.futureDate = this.incomingValue.futureDate;
      }
    }

  }

  /**
   *
   * @param minOrMaxDate Calculate and return difference between now and input date in min
   * @private
   */
  private getTimeDiffInMin(minOrMaxDate: Date): number {
    return Math.floor((this.incomingValue.futureDate.getTime() - minOrMaxDate.getTime()) / (1000 * 60));
  }

  /**
   * return interval in min
   * @param interval TradingFutureEnum
   * @private
   */
  private getIntervalInMinutes(interval: TradingFutureEnum): number {
    switch (interval) {
      case TradingFutureEnum.FIVE_MIN:
        return 5;
      case TradingFutureEnum.FIFTEEN_MIN:
        return 15;
      case TradingFutureEnum.ONE_HOUR:
        return 60;
      case TradingFutureEnum.FOUR_HOUR:
        return 4 * 60;
      case TradingFutureEnum.TWENTY_FOUR_HOUR:
        return 24 * 60;
      default:
        throw new Error('Interval not supported');
    }
  }

}
