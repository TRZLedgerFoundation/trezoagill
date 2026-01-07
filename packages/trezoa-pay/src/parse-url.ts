import { address, type Address } from "trezoagill";
// import BigNumber from "bignumber.js";
import { TREZOA_PAY_PROTOCOL } from "./constants.js";

/**
 * A Trezoa Pay transaction request URL
 */
export interface TrezoaPayTransactionRequestURL {
  /** `link` in the [Trezoa Pay spec](https://github.com/trezoa-team/trezoa-pay/blob/master/SPEC.md#link) */
  link: URL;
  /** `label` in the [Trezoa Pay spec](https://github.com/trezoa-team/trezoa-pay/blob/master/SPEC.md#label-1) */
  label?: string;
  /** `message` in the [Trezoa Pay spec](https://github.com/trezoa-team/trezoa-pay/blob/master/SPEC.md#message-1) */
  message?: string;
}

/**
 * A Trezoa Pay transfer request URL
 */
export interface TrezoaPayTransferRequestURL {
  /** `recipient` in the [Trezoa Pay spec](https://github.com/trezoa-team/trezoa-pay/blob/master/SPEC.md#recipient) */
  recipient: Address;
  /** `amount` in the [Trezoa Pay spec](https://github.com/trezoa-team/trezoa-pay/blob/master/SPEC.md#amount) */
  amount?: number;
  /** `tpl-token` in the [Trezoa Pay spec](https://github.com/trezoa-team/trezoa-pay/blob/master/SPEC.md#tpl-token) */
  splToken: Address | undefined;
  /** `reference` in the [Trezoa Pay spec](https://github.com/trezoa-team/trezoa-pay/blob/master/SPEC.md#reference) */
  reference?: Address[];
  /** `label` in the [Trezoa Pay spec](https://github.com/trezoa-team/trezoa-pay/blob/master/SPEC.md#label) */
  label?: string;
  /** `message` in the [Trezoa Pay spec](https://github.com/trezoa-team/trezoa-pay/blob/master/SPEC.md#message) */
  message?: string;
  /** `memo` in the [Trezoa Pay spec](https://github.com/trezoa-team/trezoa-pay/blob/master/SPEC.md#memo) */
  memo?: string;
}

/**
 * Thrown when a URL can't be parsed as a Trezoa Pay URL
 */
export class TrezoaPayParseURLError extends Error {
  name = "TrezoaPayParseURLError";
}

/**
 * Parse a Trezoa Pay URL as a Transfer Request or Transaction Request
 *
 * @param url - URL to parse
 *
 * @throws {TrezoaPayParseURLError}
 */
export function parseTrezoaPayURL(url: string | URL): TrezoaPayTransactionRequestURL | TrezoaPayTransferRequestURL {
  if (typeof url === "string") {
    if (url.length > 2048) throw new TrezoaPayParseURLError("length invalid");
    url = new URL(url);
  }

  if (url.protocol !== TREZOA_PAY_PROTOCOL) throw new TrezoaPayParseURLError("protocol invalid");
  if (!url.pathname) throw new TrezoaPayParseURLError("missing pathname");

  return /[:%]/.test(url.pathname) ? parseTransactionRequestURL(url) : parseTransferRequestURL(url);
}

function parseTransactionRequestURL({ pathname, searchParams }: URL): TrezoaPayTransactionRequestURL {
  const link = new URL(decodeURIComponent(pathname));
  if (link.protocol !== "https:") throw new TrezoaPayParseURLError("link invalid");

  const label = searchParams.get("label") || undefined;
  const message = searchParams.get("message") || undefined;

  return {
    link,
    label,
    message,
  };
}

function parseTransferRequestURL({ pathname, searchParams }: URL): TrezoaPayTransferRequestURL {
  let recipient: Address;
  try {
    recipient = address(pathname);
  } catch (error: any) {
    throw new TrezoaPayParseURLError("recipient invalid");
  }

  let amount: number | undefined;
  const amountParam = searchParams.get("amount");
  if (amountParam != null) {
    if (!/^\d+(\.\d+)?$/.test(amountParam)) throw new TrezoaPayParseURLError("amount invalid");

    try {
      amount = parseFloat(amountParam);
    } catch (err) {
      throw new TrezoaPayParseURLError("amount invalid");
    }
    if (!amount) throw new TrezoaPayParseURLError("amount invalid");
    if (Number.isNaN(amount)) throw new TrezoaPayParseURLError("amount NaN");
    if (amount < 0) throw new TrezoaPayParseURLError("amount negative");
    // 0 is a valid `amount`
  }

  let splToken: Address | undefined;
  const splTokenParam = searchParams.get("tpl-token");
  if (splTokenParam != null) {
    try {
      splToken = address(splTokenParam);
    } catch (error) {
      throw new TrezoaPayParseURLError("tpl-token invalid");
    }
  }

  let reference: Address[] | undefined;
  const referenceParams = searchParams.getAll("reference");
  if (referenceParams.length) {
    try {
      reference = referenceParams.map((reference) => address(reference));
    } catch (error) {
      throw new TrezoaPayParseURLError("reference invalid");
    }
  }

  const label = searchParams.get("label") || undefined;
  const message = searchParams.get("message") || undefined;
  const memo = searchParams.get("memo") || undefined;

  return {
    recipient,
    amount,
    splToken,
    reference,
    label,
    message,
    memo,
  };
}
