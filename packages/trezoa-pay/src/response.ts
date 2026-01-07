import { transactionFromBase64, type Transaction } from "trezoagill";

export class TrezoaPayResponseError extends Error {
  name = "TrezoaPayResponseError";
}

export interface TrezoaPayTransactionRequestGetResponse {
  label: string;
  icon: string;
}

export interface TrezoaPayTransactionRequestPostResponse {
  transaction: string;
  message?: string;
}

export interface TrezoaPayTransactionRequestGetResponseParsed {
  label: string;
  icon: URL;
}

export interface TrezoaPayTransactionRequestPostResponseParsed {
  transaction: Transaction;
  message?: string;
}

/**
 * Parse provided input to be a valid Trezoa Pay Transaction Request's
 * [GET response](https://github.com/trezoa/trezoa-pay/blob/master/SPEC.md#get-response)
 * per the spec
 */
export function parseTrezoaPayGetResponse(data: any): TrezoaPayTransactionRequestGetResponseParsed {
  if (!data.label || typeof data.label !== "string") {
    throw new TrezoaPayResponseError("Invalid response: missing or invalid label");
  }

  if (!data.icon || typeof data.icon !== "string") {
    throw new TrezoaPayResponseError("Invalid response: missing or invalid icon");
  }

  let iconUrl: URL;
  try {
    iconUrl = new URL(data.icon);
  } catch {
    throw new TrezoaPayResponseError("Invalid icon URL format");
  }

  if (iconUrl.protocol !== "http:" && iconUrl.protocol !== "https:") {
    throw new TrezoaPayResponseError("Icon URL must use HTTP or HTTPS protocol");
  }

  // jpg is not in the v1.1 spec, but they should be :)
  const allowedExtensions = [".svg", ".png", ".webp", ".jpg", ".jpeg"];
  const hasValidExtension = allowedExtensions.some((ext) => iconUrl.pathname.toLowerCase().endsWith(ext));

  if (!hasValidExtension) {
    throw new TrezoaPayResponseError("Icon must be SVG, PNG, WebP, or JPEG format");
  }

  return {
    label: data.label,
    icon: iconUrl,
  };
}

/**
 * Parse provided input to be a valid Trezoa Pay Transaction Request's
 * [POST response](https://github.com/trezoa/trezoa-pay/blob/master/SPEC.md#post-response)
 * per the spec
 */
export function parseTrezoaPayPostResponse(data: any): TrezoaPayTransactionRequestPostResponseParsed {
  if (!data.transaction || typeof data.transaction !== "string") {
    throw new TrezoaPayResponseError("Invalid response: missing or invalid transaction");
  }

  if (data.message && typeof data.message !== "string") {
    throw new TrezoaPayResponseError("Invalid response: message must be string");
  }

  let transaction: Transaction | null = null;

  try {
    transaction = transactionFromBase64(data.transaction);
  } catch {
    throw new TrezoaPayResponseError("Invalid transaction data as base64");
  }

  return {
    transaction,
    message: data.message,
  };
}
