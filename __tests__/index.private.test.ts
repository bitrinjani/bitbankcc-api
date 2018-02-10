import BitbankCcApi from '../lib/index';
import { nocksetup } from './nocksetup.private';
import * as nock from 'nock';

beforeAll(() => {
  nocksetup();
});

afterAll(() => {
  nock.restore();
});

test('getOrder', async () => {
  const api = new BitbankCcApi('key', 'secret');
  const res = await api.getOrder({ pair: 'btc_jpy', order_id: 12345 });
  expect(res.order_id).toBe(12345);
  expect(res.price).toBe(500000);
});

test('sendOrder', async () => {
  const api = new BitbankCcApi('key', 'secret');
  const res = await api.sendOrder({ pair: 'btc_jpy', amount: 0.001, price: 500000, side: 'buy', type: 'limit' });
  expect(res.order_id).toBe(12345);
  expect(res.price).toBe(500000);
});

test('sendOrder throws', async () => {
  const api = new BitbankCcApi('key', 'secret');
  try {
  const res = await api.sendOrder({ pair: 'btc_jpy', amount: 0.001, price: 500000, side: 'buy', type: 'limit' });
  } catch (ex) {
    expect(ex.message).toBe('60001 保有数量が不足しています');
    return;
  }
  expect(true).toBe(false);
});

test('cancelOrder', async () => {
  const api = new BitbankCcApi('key', 'secret');
  const res = await api.cancelOrder({ pair: 'btc_jpy', order_id: 12345 });
  expect(res.order_id).toBe(12345);
  expect(res.price).toBe(500000);
  expect(res.status).toBe('CANCELED_UNFILLED');
});

test('assets', async () => {
  const api = new BitbankCcApi('key', 'secret');
  const res = await api.getAssets();
  expect(res.assets[0].asset).toBe('jpy');
})
