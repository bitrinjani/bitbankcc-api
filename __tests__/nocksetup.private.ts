// tslint:disable:max-line-length
import * as nock from 'nock';
import * as testdata from './testdata';

export function nocksetup() {
  const api = nock('https://api.bitbank.cc');
  api.get('/v1/user/spot/order?pair=btc_jpy&order_id=12345').reply(200, testdata.getOrderRes);

  api
    .post('/v1/user/spot/order', { pair: 'btc_jpy', amount: 0.001, price: 500000, side: 'buy', type: 'limit' })
    .reply(200, testdata.sendOrderRes);
  api.post('/v1/user/spot/order', { pair: 'btc_jpy', amount: 0.001, price: 500000, side: 'buy', type: 'limit' }).reply(200, testdata.sendOrderError);
  
  api.post('/v1/user/spot/cancel_order', { pair: 'btc_jpy', order_id: 12345 }).reply(200, testdata.cancelOrderRes);
  api.get('/v1/user/assets').reply(200, testdata.assetsRes);
}
