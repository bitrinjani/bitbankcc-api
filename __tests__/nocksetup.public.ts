// tslint:disable:max-line-length
import * as nock from 'nock';
import * as testdata from './testdata';

export function nocksetup() {
  const api = nock('https://public.bitbank.cc');
  api.get('/btc_jpy/depth').reply(200, testdata.depthRes);
  api.get('/btc_jpy/ticker').reply(200, testdata.tickerRes);
  api.get('/btc_jpy/transactions').reply(200, testdata.transactionsRes);
  api.get('/btc_jpy/candlestick/1hour/20180101').reply(200, testdata.candleRes);
}
