[![Build Status](https://travis-ci.org/bitrinjani/bitbankcc-api.svg?branch=master)](https://travis-ci.org/bitrinjani/bitbankcc-api) [![Coverage Status](https://coveralls.io/repos/github/bitrinjani/bitbankcc-api/badge.svg?branch=master)](https://coveralls.io/github/bitrinjani/bitbankcc-api?branch=master) [![npm version](https://badge.fury.io/js/%40bitr%2Fbitbankcc-api.svg)](https://badge.fury.io/js/%40bitr%2Fbitbankcc-api)

[日本語](https://github.com/bitrinjani/bitbankcc-api#typescriptjavascript-wrapper-for-bitbankcc-rest-api-1)

# TypeScript/JavaScript wrapper for Bitbank.cc REST API

bitbankcc-api library is a TypeScript wrapper for Bitbank.cc REST API. The npm module contains its type file (.d.ts) to assist TypeScript developers. It also can be used for pure JavaScript.

# Installation

```
npm install @bitr/bitbankcc-api
```

# What's the difference from [bitbankinc/node-bitbankcc](https://github.com/bitbankinc/node-bitbankcc)?

This wrapper library has some enhancements, compared to the official library.

* Available in public npm repository
* Contains the type file for TypeScript
* Checks the `success` field in the response and converts `"success": 0` to an exception with the formatted message, converting the error code to the human-readable string. The response message contains only `data` part for simplicity.
* Casts price/amount/fee from `string` type to `number` internally.

# Example

```typescript
import BitbankCcApi from '@bitr/bitbankcc-api';

(async function() {
  const api = new BitbankCcApi('key', 'secret');
  try {
    const res = await api.sendOrder({ pair: 'btc_jpy', amount: 0.1, price: 500000, side: 'sell', type: 'limit' });
    console.log(res.order_id); // order successfully created
  } catch (ex) {
    console.log(ex.message); // error message like '60001 保有数量が不足しています'
  }
})()();
```

------- 

# TypeScript/JavaScript wrapper for Bitbank.cc REST API

bitbankcc-apiライブラリはBitbank.cc REST APIのラッパーです。npmモジュールとして公開されており、TypeScript用のタイプファイル(.d.ts)を含んでいます。純粋なJavaScriptからも利用可能です。

# インストール方法

```
npm install @bitr/bitbankcc-api
```

# [bitbankinc/node-bitbankcc](https://github.com/bitbankinc/node-bitbankcc)との違い

このラッパーライブラリは、公式ライブラリと比べ以下の点を改善しています。

* npmレポジトリに公開済み
* TypeScript用タイプファイルを含む
* APIレスポンスの`success`フィールドをチェックし、もし`"success": 0`であれば、レスポンスに含まれるエラーコードを対応するメッセージに変換した上で例外を送出する。もし`"success": 1`であれば、`data`の部分だけをメソッドの戻り値として返す。
* 価格、数量、手数料などの型を内部的に文字列から数値にして返す。

# 例

```typescript
import BitbankCcApi from '@bitr/bitbankcc-api';

(async function() {
  const api = new BitbankCcApi('key', 'secret');
  try {
    const res = await api.sendOrder({ pair: 'btc_jpy', amount: 0.1, price: 500000, side: 'sell', type: 'limit' });
    console.log(res.order_id); // オーダーの作成成功。オーダーIDを表示
  } catch (ex) {
    console.log(ex.message); // エラー発生。'60001 保有数量が不足しています'のようなエラーメッセージを表示。
  }
})()();
```
