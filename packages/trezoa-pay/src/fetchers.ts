import { TrezoaPayTransactionRequestPostRequest, validateTrezoaPayRequestUrl } from "./request.js";
import {
  parseTrezoaPayGetResponse,
  parseTrezoaPayPostResponse,
  TrezoaPayTransactionRequestGetResponseParsed,
  TrezoaPayTransactionRequestPostResponseParsed,
} from "./response.js";

/**
 * Generic HTTP fetcher for Trezoa Pay transaction request endpoints.
 *
 * Validates URL, makes request, and optionally parses the JSON response.
 *
 * @template TResponse - Expected response type (defaults to unknown)
 * @param url - Trezoa Pay transaction request URL (must be https://)
 * @param config - Request configuration
 * @param config.method - HTTP method (GET or POST)
 * @param config.body - Request body (JSON stringified)
 * @param config.parser - Optional response parser/validator
 * @param config.requestInit - Optional fetch options
 * @returns Parsed response or raw JSON if no parser provided
 * @throws {Error} Invalid URL, HTTP error, JSON parse error, or schema validation error
 */
export async function fetchTrezoaPayRequest<TResponse = unknown>(
  url: URL,
  config: {
    method: "GET" | "POST";
    body?: unknown;
    parser?: (data: unknown) => TResponse;
    requestInit?: RequestInit;
  },
): Promise<TResponse> {
  validateTrezoaPayRequestUrl(url);

  const baseHeaders: HeadersInit = {
    Accept: "application/json",
    "Accept-Encoding": "gzip, deflate, br",
  };

  if (config.method === "POST" || config.body !== undefined) {
    baseHeaders["Content-Type"] = "application/json";
  }

  // Destructure to exclude headers from requestInit since we handle them separately
  const { headers: _headers, ...restRequestInit } = config.requestInit || {};

  const response = await fetch(url, {
    method: config.method,
    headers: {
      ...baseHeaders,
      ...config.requestInit?.headers,
    },
    body: config.body !== undefined ? JSON.stringify(config.body) : undefined,
    ...restRequestInit,
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch (error) {
    throw new Error(`Failed to parse response as JSON: ${error instanceof Error ? error.message : String(error)}`);
  }

  if (config.parser) {
    try {
      return config.parser(data);
    } catch (error) {
      throw new Error(`Failed to validate response schema: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  return data as TResponse;
}

/**
 * Fetches merchant information for a Trezoa Pay transaction request.
 *
 * Makes a GET request to retrieve the merchant's label and icon, which are displayed
 * to the user before presenting the transaction for signing.
 *
 * @param url - Trezoa Pay transaction request URL (must be https://)
 * @param options - Optional fetch configuration
 * @returns Merchant label and icon
 * @throws {Error} Invalid URL, HTTP error, or invalid response schema
 *
 * @example
 * ```typescript
 * const { label, icon } = await fetchTrezoaPayGetRequest(
 *   new URL('https://merchant.example.com/api')
 * );
 * console.log(label); // "Example Merchant"
 * console.log(icon);  // URL object: https://merchant.example.com/icon.svg
 * ```
 */
export async function fetchTrezoaPayGetRequest(
  url: URL,
  options?: RequestInit,
): Promise<TrezoaPayTransactionRequestGetResponseParsed> {
  return fetchTrezoaPayRequest(url, {
    method: "GET",
    parser: parseTrezoaPayGetResponse,
    requestInit: options,
  });
}

/**
 * Requests a transaction from a Trezoa Pay merchant endpoint.
 *
 * Makes a POST request with the user's account address. The merchant returns a
 * serialized transaction (unsigned or partially signed) for the wallet to sign.
 *
 * @param url - Trezoa Pay transaction request URL (must be https://)
 * @param body - Request body containing the user's account address
 * @param options - Optional fetch configuration
 * @returns transaction and optional message
 * @throws {Error} Invalid URL, HTTP error, or invalid response schema
 *
 * @example
 * ```typescript
 * const { transaction, message } = await fetchTrezoaPayPostRequest(
 *   new URL('https://merchant.example.com/api'),
 *   { account: address("user123...") }
 * );
 * // transaction is automatically decoded and deserialized
 * // message is an optional string to display to the user
 * ```
 */
export async function fetchTrezoaPayPostRequest(
  url: URL,
  body: TrezoaPayTransactionRequestPostRequest,
  options?: RequestInit,
): Promise<TrezoaPayTransactionRequestPostResponseParsed> {
  return fetchTrezoaPayRequest(url, {
    method: "POST",
    body,
    parser: parseTrezoaPayPostResponse,
    requestInit: options,
  });
}

/**
 * Trezoa Pay transaction request methods.
 *
 * @property {Function} get - Fetch merchant information (label and icon)
 * @property {Function} post - Request a transaction from the merchant
 *
 * @example
 * ```typescript
 * const { label, icon } = await trezoaPayTransactionRequest.get(url);
 * const { transaction } = await trezoaPayTransactionRequest.post(url, { account });
 * ```
 */
export const trezoaPayTransactionRequest = {
  get: fetchTrezoaPayGetRequest,
  post: fetchTrezoaPayPostRequest,
};
