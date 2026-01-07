import type { Address } from "trezoagill";
import { TREZOA_PAY_PROTOCOL } from "./constants.js";

/**
 * Fields of a Trezoa Pay transaction request URL.
 */
export interface TrezoaPayTransactionRequestURLFields {
  /** `link` in the [Trezoa Pay spec](https://github.com/trezoa-team/trezoa-pay/blob/master/SPEC.md#link) */
  link: URL;
  /** `label` in the [Trezoa Pay spec](https://github.com/trezoa-team/trezoa-pay/blob/master/SPEC.md#label-1) */
  label?: string;
  /** `message` in the [Trezoa Pay spec](https://github.com/trezoa-team/trezoa-pay/blob/master/SPEC.md#message-1).  */
  message?: string;
}

/**
 * Fields of a Trezoa Pay transfer request URL.
 */
export interface TrezoaPayTransferRequestURLFields {
  /** `recipient` in the [Trezoa Pay spec](https://github.com/trezoa-team/trezoa-pay/blob/master/SPEC.md#recipient) */
  recipient: Address;
  /** `amount` in the [Trezoa Pay spec](https://github.com/trezoa-team/trezoa-pay/blob/master/SPEC.md#amount) */
  amount?: number | string;
  /** `tpl-token` in the [Trezoa Pay spec](https://github.com/trezoa-team/trezoa-pay/blob/master/SPEC.md#tpl-token) */
  splToken?: Address;
  /** `reference` in the [Trezoa Pay spec](https://github.com/trezoa-team/trezoa-pay/blob/master/SPEC.md#reference) */
  reference?: Address | Address[];
  /** `label` in the [Trezoa Pay spec](https://github.com/trezoa-team/trezoa-pay/blob/master/SPEC.md#label) */
  label?: string;
  /** `message` in the [Trezoa Pay spec](https://github.com/trezoa-team/trezoa-pay/blob/master/SPEC.md#message).  */
  message?: string;
  /** `memo` in the [Trezoa Pay spec](https://github.com/trezoa-team/trezoa-pay/blob/master/SPEC.md#memo) */
  memo?: string;
}

/**
 * Encode a Trezoa Pay URL
 *
 * @param fields Fields to encode in the URL
 */
export function encodeTrezoaPayURL(
  fields: TrezoaPayTransactionRequestURLFields | TrezoaPayTransferRequestURLFields,
): URL {
  return "link" in fields ? encodeTransactionRequestURL(fields) : encodeTransferRequestURL(fields);
}

function encodeTransactionRequestURL({ link, label, message }: TrezoaPayTransactionRequestURLFields): URL {
  if (link.protocol !== "https:") {
    throw new Error("Link must use HTTPS protocol");
  }

  // Remove trailing slashes
  const pathname = link.search
    ? encodeURIComponent(String(link).replace(/\/\?/, "?"))
    : String(link).replace(/\/$/, "");
  const url = new URL(TREZOA_PAY_PROTOCOL + pathname);

  if (label) {
    url.searchParams.append("label", label);
  }

  if (message) {
    url.searchParams.append("message", message);
  }

  return url;
}

function encodeTransferRequestURL({
  recipient,
  amount,
  splToken,
  reference,
  label,
  message,
  memo,
}: TrezoaPayTransferRequestURLFields): URL {
  const url = new URL(TREZOA_PAY_PROTOCOL + recipient);

  if (amount) {
    url.searchParams.append("amount", amount.toString());
  }

  if (splToken) {
    url.searchParams.append("tpl-token", splToken);
  }

  if (reference) {
    if (!Array.isArray(reference)) {
      reference = [reference];
    }

    for (const pubkey of reference) {
      url.searchParams.append("reference", pubkey);
    }
  }

  if (label) {
    url.searchParams.append("label", label);
  }

  if (message) {
    url.searchParams.append("message", message);
  }

  if (memo) {
    url.searchParams.append("memo", memo);
  }

  return url;
}
