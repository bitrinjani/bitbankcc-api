export interface DepthRequest {
  pair: string;
}

export interface TickerRequest {
  pair: string;
}

export interface TransactionsRequest {
  pair: string;
  date?: string;
}

export interface CandlestickRequest {
  pair: string;
  candleType: string;
  date: string;
}

export interface SendOrderRequest {
  pair: string;
  amount: number;
  price: number;
  side: string;
  type: string;
}

export interface GetOrderRequest {
  pair: string;
  order_id: number;
}

export interface CancelOrderRequest {
  pair: string;
  order_id: number;
}

export interface SuccessResponse<T> {
  success: 1;
  data: T;
}

export interface ErrorResponse {
  success: 0;
  data: {
    code: number;
  };
}

export interface DepthResponse {
  asks: string[][];
  bids: string[][];
  timestamp: number;
}

export interface TickerResponse {
  sell: string;
  buy: string;
  high: string;
  low: string;
  last: string;
  vol: string;
  timestamp: number;
}

export interface TransactionsResponse {
  transactions: {
    transaction_id: number;
    side: string;
    price: string;
    amount: string;
    executed_at: number;
  }[];
}

export interface CandlestickResponse {
  candlestick: {
    type: string;
    ohlcv: string[][];
  }[];
}

export interface AssetsResponse {
  assets: {
    asset: string;
    amount_precision: number;
    onhand_amount: string;
    locked_amount: string;
    free_amount: string;
    withdrawal_fee: string;
  }[];
}

export interface SendOrderResponse {
  order_id: number;
  pair: string;
  side: string;
  type: string;
  start_amount: string;
  remaining_amount: string;
  executed_amount: string;
  price: string;
  average_price: string;
  ordered_at: number;
  status: string;
}

export interface GetOrderResponse {
  order_id: number;
  pair: string;
  side: string;
  type: string;
  start_amount: string;
  remaining_amount: string;
  executed_amount: string;
  price: string;
  average_price: string;
  ordered_at: number;
  status: string;
}

export interface CancelOrderResponse {
  order_id: number;
  pair: string;
  side: string;
  type: string;
  start_amount: string;
  remaining_amount: string;
  executed_amount: string;
  price: string;
  average_price: string;
  ordered_at: number;
  status: string;
}
