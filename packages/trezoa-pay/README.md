<h1 align="center">
  @trezoagill/trezoa-pay
</h1>

<p align="center">
  modern and type-safe Trezoa Pay protocol client library, built on top of trezoagill
</p>

<p align="center">
  <a href="https://github.com/TRZLedgerFoundation/trezoagill/actions/workflows/publish-packages.yml"><img src="https://img.shields.io/github/actions/workflow/status/trezoagill/trezoagill/publish-packages.yml?logo=GitHub&label=tests" /></a>
  <a href="https://www.npmjs.com/package/@trezoagill/trezoa-pay"><img src="https://img.shields.io/npm/v/@trezoagill/trezoa-pay?logo=npm&color=377CC0" /></a>
  <a href="https://www.npmjs.com/package/@trezoagill/trezoa-pay"><img src="https://img.shields.io/npm/dm/@trezoagill/trezoa-pay?color=377CC0" /></a>
</p>

## Overview

`@trezoagill/trezoa-pay` is a complete, type-safe implementation of the
[Trezoa Pay specification](https://github.com/trezoa/trezoa-pay/blob/master/SPEC.md). Trezoa Pay is a
standardized protocol for encoding transaction requests within URLs, enabling seamless payments and blockchain
interactions across the Trezoa ecosystem.

**Key Features:**

- **Transfer Requests**: Create payment URLs for TRZ and TPL tokens with optional reference tracking
- **Transaction Requests**: Build interactive checkout flows with HTTPS endpoints
- **URL Parsing**: Parse and validate any Trezoa Pay URL with full type safety
- **Response Handling**: Fetch and validate merchant information and transactions
- **Comprehensive Validation**: Built-in security checks including HTTPS enforcement, URL length validation, and input
  validation

## Installation

Install `@trezoagill/trezoa-pay` with your package manager of choice:

```shell
npm install trezoagill @trezoagill/trezoa-pay
```

```shell
pnpm add trezoagill @trezoagill/trezoa-pay
```

```shell
yarn add trezoagill @trezoagill/trezoa-pay
```

## Documentation

For comprehensive documentation, examples, and best practices, see the
[Trezoa Pay guide](https://trezoagill.com/docs/guides/trezoa-pay).

Additional resources:

- [trezoagill docs site](https://trezoagill.com)
- [trezoagill setup guide](https://trezoagill.com/docs#quick-start)
- [trezoagill API references](https://trezoagill.com/api)

## Request Types

Trezoa Pay supports two distinct request types:

**Transfer Requests** - Non-interactive payment URLs with all details encoded directly:

- Best for: Simple payments, invoices, QR codes
- No server required
- Example: `trezoa:recipient?amount=1.5&label=Coffee+Shop`

**Transaction Requests** - Interactive URLs pointing to HTTPS endpoints:

- Best for: Complex transactions, merchant checkouts, dynamic pricing
- Requires server-side implementation
- Example: `trezoa:https://merchant.example.com/api`

See the [Request Types documentation](https://trezoagill.com/docs/guides/trezoa-pay#request-types) for detailed comparison.

## API Reference

| Function                           | Purpose                                     | Documentation                                                                                                                                                              |
| ---------------------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `encodeTrezoaPayURL`               | Create transfer or transaction request URLs | [Transfer Requests](https://trezoagill.com/docs/guides/trezoa-pay#transfer-requests), [Transaction Requests](https://trezoagill.com/docs/guides/trezoa-pay#transaction-requests) |
| `parseTrezoaPayURL`                | Parse and validate any Trezoa Pay URL       | [Parsing URLs](https://trezoagill.com/docs/guides/trezoa-pay#parsing-trezoa-pay-urls)                                                                                         |
| `trezoaPayTransactionRequest.get`  | Fetch merchant info (GET request)           | [Fetching Merchant Information](https://trezoagill.com/docs/guides/trezoa-pay#fetching-merchant-information-get-request)                                                      |
| `trezoaPayTransactionRequest.post` | Request transaction (POST request)          | [Requesting a Transaction](https://trezoagill.com/docs/guides/trezoa-pay#requesting-a-transaction-post-request)                                                               |
| `parseTrezoaPayGetResponse`        | Validate GET response data                  | [Validating GET Responses](https://trezoagill.com/docs/guides/trezoa-pay#validating-get-responses)                                                                            |
| `parseTrezoaPayPostResponse`       | Validate POST response data                 | [Validating POST Responses](https://trezoagill.com/docs/guides/trezoa-pay#validating-post-responses)                                                                          |

## Quick Start

### Transfer Request (Simple Payment)

```ts
import { encodeTrezoaPayURL } from "@trezoagill/trezoa-pay";
import { address } from "trezoagill";

// Create a payment request for 1.5 TRZ
const url = encodeTrezoaPayURL({
  recipient: address("nick6zJc6HpW3kfBm4xS2dmbuVRyb5F3AnUvj5ymzR5"),
  amount: 1.5,
  label: "Coffee Shop",
  message: "Payment for espresso",
});
// → "trezoa:nick6zJc6HpW3kfBm4xS2dmbuVRyb5F3AnUvj5ymzR5?amount=1.5&label=Coffee+Shop&message=Payment+for+espresso"
```

### Transaction Request (Interactive Checkout)

```ts
import { encodeTrezoaPayURL, trezoaPayTransactionRequest } from "@trezoagill/trezoa-pay";
import { address } from "trezoagill";

// Create a transaction request URL
const url = encodeTrezoaPayURL({
  link: new URL("https://merchant.example.com/api"),
  label: "Example Merchant",
  message: "Purchase item #42",
});

// Fetch merchant information (GET request)
const { label, icon } = await trezoaPayTransactionRequest.get(new URL("https://merchant.example.com/api"));

// Request transaction (POST request)
const { transaction, message } = await trezoaPayTransactionRequest.post(new URL("https://merchant.example.com/api"), {
  account: address("nick6zJc6HpW3kfBm4xS2dmbuVRyb5F3AnUvj5ymzR5"),
});
```
