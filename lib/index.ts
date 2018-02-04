import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  DepthResponse,
  DepthRequest,
  SendOrderRequest,
  GetOrderResponse,
  GetOrderRequest,
  CancelOrderResponse,
  CancelOrderRequest,
  ErrorResponse,
  SendOrderResponse,
  SuccessResponse,
  TickerResponse,
  TickerRequest,
  TransactionsRequest,
  TransactionsResponse,
  CandlestickRequest,
  CandlestickResponse,
  AssetsResponse,
  CancelOrdersRequest,
  CancelOrdersResponse,
  OrdersInfoRequest,
  OrdersInfoResponse,
  ActiveOrdersRequest,
  ActiveOrdersResponse,
  TradeHistoryRequest,
  TradeHistoryResponse,
  WithdrawalAccountRequest,
  WithdrawalAccountResponse,
  RequestWithdrawalRequest,
  RequestWithdrawalResponse
} from './apiTypes';
import * as util from './util';
import * as crypto from 'crypto';
import { errorMap } from './errorMap';
import * as querystring from 'querystring';
import { EventEmitter } from 'events';
import * as _ from 'lodash';

// to avoid a known issue with axios + nock.  https://github.com/axios/axios/issues/305
axios.defaults.adapter = require('axios/lib/adapters/http');

export default class BitbankCcApi extends EventEmitter {
  private readonly publicApiBaseUrl = 'https://public.bitbank.cc';
  private readonly privateApiBaseUrl = 'https://api.bitbank.cc';
  private readonly publicApiAxios: AxiosInstance;
  private readonly privateApiAxios: AxiosInstance;

  constructor(private readonly key: string, private readonly secret: string, private readonly timeout: number = 5000) {
    super();
    this.publicApiAxios = axios.create({ baseURL: this.publicApiBaseUrl, timeout: this.timeout });
    this.privateApiAxios = axios.create({ baseURL: this.privateApiBaseUrl, timeout: this.timeout });
  }

  async getTicker(request: TickerRequest): Promise<TickerResponse> {
    const path = `/${request.pair}/ticker`;
    return await this.getPublic<TickerResponse>(path);
  }

  async getDepth(request: DepthRequest): Promise<DepthResponse> {
    const path = `/${request.pair}/depth`;
    return await this.getPublic<DepthResponse>(path);
  }

  async getTransactions(request: TransactionsRequest): Promise<TransactionsResponse> {
    let path = `/${request.pair}/transactions`;
    if (request.date !== undefined) {
      path += `/${request.date}`;
    }
    return await this.getPublic<TransactionsResponse>(path);
  }

  async getCandlestick(request: CandlestickRequest): Promise<CandlestickResponse> {
    const path = `/${request.pair}/candlestick/${request.candleType}/${request.date}`;
    return await this.getPublic<CandlestickResponse>(path);
  }

  async getAssets(): Promise<AssetsResponse> {
    const path = `/v1/user/assets`;
    return await this.get<{}, AssetsResponse>(path, {});
  }

  async sendOrder(request: SendOrderRequest): Promise<SendOrderResponse> {
    const path = `/v1/user/spot/order`;
    return await this.post<SendOrderRequest, SendOrderResponse>(path, request);
  }

  async getOrder(request: GetOrderRequest): Promise<GetOrderResponse> {
    const path = `/v1/user/spot/order`;
    return await this.get<GetOrderRequest, GetOrderResponse>(path, request);
  }

  async cancelOrder(request: CancelOrderRequest): Promise<CancelOrderResponse> {
    const path = `/v1/user/spot/cancel_order`;
    return await this.post<CancelOrderRequest, CancelOrderResponse>(path, request);
  }

  async cancelOrders(request: CancelOrdersRequest): Promise<CancelOrdersResponse> {
    const path = `/v1/user/spot/cancel_orders`;
    return await this.post<CancelOrdersRequest, CancelOrdersResponse>(path, request);
  }

  async getOrdersInfo(request: OrdersInfoRequest): Promise<OrdersInfoResponse> {
    const path = `/v1/user/spot/orders_info`;
    return await this.post<OrdersInfoRequest, OrdersInfoResponse>(path, request);
  }

  async getActiveOrders(request: ActiveOrdersRequest): Promise<ActiveOrdersResponse> {
    const path = `/v1/user/spot/active_orders`;
    return await this.get<ActiveOrdersRequest, ActiveOrdersResponse>(path, request);
  }

  async getTradeHistory(request: TradeHistoryRequest): Promise<TradeHistoryResponse> {
    const path = `/v1/user/spot/trade_history`;
    return await this.get<TradeHistoryRequest, TradeHistoryResponse>(path, request);
  }

  async getWithdrawalAccount(request: WithdrawalAccountRequest): Promise<WithdrawalAccountResponse> {
    const path = `/v1/user/withdrawal_account`;
    return await this.get<WithdrawalAccountRequest, WithdrawalAccountResponse>(path, request);
  }

  async requestWithdrawal(request: RequestWithdrawalRequest): Promise<RequestWithdrawalResponse> {
    const path = `/v1/user/request_withdrawal`;
    return await this.post<RequestWithdrawalRequest, RequestWithdrawalResponse>(path, request);
  }

  private async privateApiCall<Req, Res>(method: 'GET' | 'POST', path: string, request: Req): Promise<Res> {
    let axiosConfig: AxiosRequestConfig;
    switch (method) {
      case 'GET':
        axiosConfig = this.createGetConfig(path, request);
        break;
      case 'POST':
        axiosConfig = this.createPostConfig(path, request);
        break;
      default:
        throw new Error(`Unknown method ${method}.`);
    }
    const requestSummary = { url: `${this.privateApiAxios.defaults.baseURL}${axiosConfig.url}`, method, headers: axiosConfig };
    this.emit('private_request', requestSummary);
    const axiosResponse = await this.privateApiAxios.request<SuccessResponse<Res> | ErrorResponse>(axiosConfig);
    const response = axiosResponse.data;
    this.emit('private_response', response, requestSummary);
    this.checkError(response);
    return response.data as Res;
  }

  private async post<Req, Res>(path: string, request: Req): Promise<Res> {
    return await this.privateApiCall<Req, Res>('POST', path, request);
  }

  private async get<Req, Res>(path: string, request: Req): Promise<Res> {
    return await this.privateApiCall<Req, Res>('GET', path, request);
  }

  private async getPublic<Res>(path: string) {
    const url = `${this.privateApiAxios.defaults.baseURL}${path}`;
    this.emit('public_request', url);
    const axiosResponse = await this.publicApiAxios.get<SuccessResponse<Res> | ErrorResponse>(path);
    const response = axiosResponse.data;
    this.emit('public_response', response, url);
    this.checkError(response);
    return response.data as Res;
  }

  private checkError(response: SuccessResponse<any> | ErrorResponse) {
    if (response.success === 0) {
      const errorMessage = errorMap[String(response.data.code)];
      throw new Error(`${response.data.code} ${errorMessage}`);
    }
  }

  private createPostConfig(path: string, request: any): AxiosRequestConfig {
    const nonce = util.nonce();
    const body = JSON.stringify(request);
    const payload = new Buffer(nonce + body);
    const signature = crypto
      .createHmac('sha256', this.secret)
      .update(payload)
      .digest('hex');
    return {
      url: path,
      method: 'post',
      data: body,
      headers: {
        'ACCESS-KEY': this.key,
        'ACCESS-NONCE': nonce,
        'ACCESS-SIGNATURE': signature
      }
    };
  }

  private createGetConfig(path: string, request: any): AxiosRequestConfig {
    const nonce = util.nonce();
    const qs = querystring.stringify(request);
    const pathWithQs = _.isEmpty(qs) ? path : `${path}?${qs}`;
    const payload = new Buffer(nonce + pathWithQs);
    const signature = crypto
      .createHmac('sha256', this.secret)
      .update(payload)
      .digest('hex');
    return {
      url: pathWithQs,
      method: 'get',
      headers: {
        'ACCESS-KEY': this.key,
        'ACCESS-NONCE': nonce,
        'ACCESS-SIGNATURE': signature
      }
    };
  }
}
