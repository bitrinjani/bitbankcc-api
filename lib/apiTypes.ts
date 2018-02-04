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

export interface OrderModel {
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

export interface SendOrderResponse extends OrderModel {}

export interface GetOrderResponse extends OrderModel {}

export interface CancelOrderResponse extends OrderModel {}

export interface CancelOrdersRequest {
  pair: string;
  order_ids: number[];
}

export interface CancelOrdersResponse {
  orders: OrderModel[];
}

export interface OrdersInfoRequest {
  pair: string;
  order_ids: number[];
}

export interface OrdersInfoResponse {
  orders: OrderModel[];
}


export interface ActiveOrdersRequest {
  pair: string;
  count: number;
  from_id: number;
  end_id: number;
  since: number;
  end: number;
}

export interface ActiveOrdersResponse {
  orders: OrderModel[];
}

export interface TradeHistoryRequest {
  pair: string;
  count: number;
  order_id: number;
  since: number;
  end: number;
  order?: string;
}

export interface TradeModel {
  trade_id: number;
  pair: string;
  order_id: number;
  side: string;
  type: string;
  amount: string;
  price: string;
  maker_taker: string;
  fee_amount_base: string;
  fee_amount_quote: string;
  executed_at: number;
}

export interface TradeHistoryResponse {
  trades: TradeModel[];
}

export interface WithdrawalAccountRequest {
  asset: string;
}

export interface Account {
  uuid: string;
  label: string;
  address: string;
}

export interface WithdrawalAccountResponse {
  accounts: Account[];
}

export interface RequestWithdrawalRequest{
  asset: string;
  uuid: string;
  amount: string;
  otp_token?: string;
  sms_token?: string;
}


export interface RequestWithdrawalResponse {
  uuid: string;
  asset: string;
  amount: number;
  account_uuid: string;
  fee: string;
  status: string;
  label: string;
  txid: string;
  address: string;
}