import BitbankCcApi from '../lib/index';
import { nocksetup } from './nocksetup.public';
import * as nock from 'nock';

beforeAll(() => {
  nocksetup();
});

afterAll(() => {
  nock.restore();
});

test('getDepth', async () => {
  const api = new BitbankCcApi('key', 'secret');
  const res = await api.getDepth({ pair: 'btc_jpy' });
  expect(res.asks.length).toBe(3);
  expect(res.asks[2][0]).toBe('943999');
})

test('getTicker', async () => {
  const api = new BitbankCcApi('key', 'secret');
  const res = await api.getTicker({ pair: 'btc_jpy' });
  expect(res.sell).toBe("947696");
})

test('getTransactions', async () => {
  const api = new BitbankCcApi('key', 'secret');
  const res = await api.getTransactions({ pair: 'btc_jpy' });
  expect(res.transactions[1].transaction_id).toBe(3296316);
})

test('candle', async () => {
  const api = new BitbankCcApi('key', 'secret');
  const res = await api.getCandlestick({ pair: 'btc_jpy', candleType: '1hour', date: '20180101'});
  expect(res.candlestick[0].ohlcv[0][0]).toBe("1710289");
})