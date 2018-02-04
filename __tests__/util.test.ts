import * as util from '../lib/util';

test('nonce', async () => {
  const result = [];
  setTimeout(() => result.push(util.nonce()), 50);
  setTimeout(() => result.push(util.nonce()), 50);
  setTimeout(() => result.push(util.nonce()), 50);
  setTimeout(() => result.push(util.nonce()), 50);
  setTimeout(() => result.push(util.nonce()), 50);
  setTimeout(() => result.push(util.nonce()), 50);
  await util.delay(100);
  const resultSet = new Set(result);
  expect(result.length).toBe(6);
  expect(result.length).toBe(resultSet.size);
});