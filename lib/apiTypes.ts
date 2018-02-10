import { Castable, cast, element } from '@bitr/castable';

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

export class DepthResponse extends Castable {
  @cast @element(Array, Number) asks: number[][];
  @cast @element(Array, Number) bids: number[][];
  @cast timestamp: number;
}

export class TickerResponse extends Castable {
  @cast sell: number;
  @cast buy: number;
  @cast high: number;
  @cast low: number;
  @cast last: number;
  @cast vol: number;
  @cast(Date) timestamp: Date;
}

export class Transaction extends Castable {
  @cast transaction_id: number;
  @cast side: string;
  @cast price: number;
  @cast amount: number;
  @cast(Date) executed_at: Date;
}

export class TransactionsResponse extends Castable {
  @cast @element(Transaction) transactions: Transaction[];
}

export class CandleStick extends Castable {
  @cast type: string;
  @cast @element(Array, Number) ohlcv: number[][];
}

export class CandlestickResponse extends Castable {
  @cast @element(CandleStick) candlestick: CandleStick[];
}

export class Asset extends Castable {
  @cast asset: string;
  @cast amount_precision: number;
  @cast onhand_amount: number;
  @cast locked_amount: number;
  @cast free_amount: number;
  @cast withdrawal_fee: number;
}

export class AssetsResponse extends Castable {
  @cast @element(Asset) assets: Asset[];
}

export class OrderModel extends Castable {
  @cast order_id: number;
  @cast pair: string;
  @cast side: string;
  @cast type: string;
  @cast start_amount: number;
  @cast remaining_amount: number;
  @cast executed_amount: number;
  @cast price: number;
  @cast average_price: number;
  @cast(Date) ordered_at: Date;
  @cast status: string;
}

export class SendOrderResponse extends OrderModel {}

export class GetOrderResponse extends OrderModel {}

export class CancelOrderResponse extends OrderModel {}

export interface CancelOrdersRequest {
  pair: string;
  order_ids: number[];
}

export class CancelOrdersResponse extends Castable {
  @cast @element(OrderModel) orders: OrderModel[];
}

export interface OrdersInfoRequest {
  pair: string;
  order_ids: number[];
}

export class OrdersInfoResponse extends Castable {
  @cast @element(OrderModel) orders: OrderModel[];
}

export interface ActiveOrdersRequest {
  pair: string;
  count: number;
  from_id: number;
  end_id: number;
  since: number;
  end: number;
}

export class ActiveOrdersResponse extends Castable {
  @cast @element(OrderModel) orders: OrderModel[];
}

export interface TradeHistoryRequest {
  pair: string;
  count: number;
  order_id: number;
  since: number;
  end: number;
  order?: string;
}

export class TradeModel extends Castable {
  @cast trade_id: number;
  @cast pair: string;
  @cast order_id: number;
  @cast side: string;
  @cast type: string;
  @cast amount: number;
  @cast price: number;
  @cast maker_taker: string;
  @cast fee_amount_base: number;
  @cast fee_amount_quote: number;
  @cast(Date) executed_at: Date;
}

export class TradeHistoryResponse extends Castable {
  @cast @element(TradeModel) trades: TradeModel[];
}

export interface WithdrawalAccountRequest {
  asset: string;
}

export class Account extends Castable {
  @cast uuid: string;
  @cast label: string;
  @cast address: string;
}

export class WithdrawalAccountResponse extends Castable {
  @cast @element(Account) accounts: Account[];
}

export interface RequestWithdrawalRequest{
  asset: string;
  uuid: string;
  amount: string;
  otp_token?: string;
  sms_token?: string;
}


export class RequestWithdrawalResponse extends Castable {
  @cast uuid: string;
  @cast asset: string;
  @cast amount: number;
  @cast account_uuid: string;
  @cast fee: string;
  @cast status: string;
  @cast label: string;
  @cast txid: string;
  @cast address: string;
}