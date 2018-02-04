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
  SuccessResponse
} from './apiTypes';
import * as util from './util';
import * as crypto from 'crypto';
import { errorMap } from './errorMap';
import * as querystring from 'querystring';

export default class Api {
  private readonly publicApiBaseUrl = 'https://public.bitbank.cc';
  private readonly privateApiBaseUrl = 'https://api.bitbank.cc';
  private readonly publicApiAxios: AxiosInstance;
  private readonly privateApiAxios: AxiosInstance;

  constructor(private readonly key: string, private readonly secret: string, private readonly timeout: number = 5000) {
    this.publicApiAxios = axios.create({ baseURL: this.publicApiBaseUrl, timeout: this.timeout });
    this.privateApiAxios = axios.create({ baseURL: this.privateApiBaseUrl, timeout: this.timeout });
  }

  async getDepth(request: DepthRequest): Promise<DepthResponse> {
    const path = `/${request.pair}/depth`;
    return await this.getPublic<DepthResponse>(path);
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

  private async post<Req, Res>(path: string, request: Req): Promise<Res> {
    const axiosConfig = this.createPostConfig(path, request);
    const axiosResponse = await this.privateApiAxios.request<SuccessResponse<Res> | ErrorResponse>(axiosConfig);
    const response = axiosResponse.data;
    this.checkError(response);
    return response.data as Res;
  }

  private async get<Req, Res>(path: string, request: Req): Promise<Res> {
    const axiosConfig = this.createGetConfig(path, request);
    const axiosResponse = await this.privateApiAxios.request<SuccessResponse<Res> | ErrorResponse>(axiosConfig);
    const response = axiosResponse.data;
    this.checkError(response);
    return response.data as Res;
  }

  private async getPublic<Res>(path: string) {
    const axiosResponse = await this.publicApiAxios.get<SuccessResponse<Res> | ErrorResponse>(path);
    const response = axiosResponse.data;
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
    const pathWithQs = `${path}?${qs}`;
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
