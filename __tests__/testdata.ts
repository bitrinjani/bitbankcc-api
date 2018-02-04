export const getOrderRes = {
  success: 1,
  data: {
    order_id: 12345,
    pair: 'btc_jpy',
    side: 'buy',
    type: 'limit',
    start_amount: '0.00100000',
    remaining_amount: '0.00100000',
    executed_amount: '0.00000000',
    price: '500000.0000',
    average_price: '0.0000',
    ordered_at: 1517709357203,
    status: 'UNFILLED'
  }
};

export const sendOrderError = { success: 0, data: { code: 60001 } };

export const sendOrderRes = {
  success: 1,
  data: {
    order_id: 12345,
    pair: 'btc_jpy',
    side: 'buy',
    type: 'limit',
    start_amount: '0.00100000',
    remaining_amount: '0.00100000',
    executed_amount: '0.00000000',
    price: '500000.0000',
    average_price: '0.0000',
    ordered_at: 1517710987242,
    status: 'UNFILLED'
  }
};

export const cancelOrderRes = {
  success: 1,
  data: {
    order_id: 12345,
    pair: 'btc_jpy',
    side: 'buy',
    type: 'limit',
    start_amount: '0.00100000',
    remaining_amount: '0.00100000',
    executed_amount: '0.00000000',
    price: '500000.0000',
    average_price: '0.0000',
    ordered_at: 1517710987242,
    canceled_at: 1517711336374,
    status: 'CANCELED_UNFILLED'
  }
};

export const assetsRes = {
  success: 1,
  data: {
    assets: [
      {
        asset: 'jpy',
        amount_precision: 4,
        onhand_amount: '19140.1450',
        locked_amount: '0.0000',
        free_amount: '19140.1450',
        stop_deposit: false,
        stop_withdrawal: false,
        withdrawal_fee: {
          threshold: '30000.0000',
          under: '540.0000',
          over: '756.0000'
        }
      },
      {
        asset: 'btc',
        amount_precision: 8,
        onhand_amount: '0.00000000',
        locked_amount: '0.00000000',
        free_amount: '0.00000000',
        stop_deposit: false,
        stop_withdrawal: false,
        withdrawal_fee: '0.00100000'
      },
      {
        asset: 'ltc',
        amount_precision: 8,
        onhand_amount: '0.00000000',
        locked_amount: '0.00000000',
        free_amount: '0.00000000',
        stop_deposit: false,
        stop_withdrawal: false,
        withdrawal_fee: '0.00100000'
      },
      {
        asset: 'xrp',
        amount_precision: 6,
        onhand_amount: '0.000000',
        locked_amount: '0.000000',
        free_amount: '0.000000',
        stop_deposit: false,
        stop_withdrawal: false,
        withdrawal_fee: '0.150000'
      },
      {
        asset: 'eth',
        amount_precision: 8,
        onhand_amount: '0.00000000',
        locked_amount: '0.00000000',
        free_amount: '0.00000000',
        stop_deposit: false,
        stop_withdrawal: false,
        withdrawal_fee: '0.00500000'
      },
      {
        asset: 'mona',
        amount_precision: 8,
        onhand_amount: '0.00000000',
        locked_amount: '0.00000000',
        free_amount: '0.00000000',
        stop_deposit: false,
        stop_withdrawal: false,
        withdrawal_fee: '0.00100000'
      },
      {
        asset: 'bcc',
        amount_precision: 8,
        onhand_amount: '0.00000000',
        locked_amount: '0.00000000',
        free_amount: '0.00000000',
        stop_deposit: false,
        stop_withdrawal: false,
        withdrawal_fee: '0.00100000'
      }
    ]
  }
};
