import { TradingFutureEnum } from './trading-future-interval.enum';
import { TradingFuture } from './trading-future.model';


export class TradingFutureMinMaxHolder {
  constructor(public interval: TradingFutureEnum,
              public tradingFutureMin: TradingFuture,
              public tradingFutureMax: TradingFuture
  ) {
  }
}
