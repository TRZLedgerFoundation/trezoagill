import { Address } from "trezoagill";

export interface TrezoaPayTransactionRequestGetRequest {
  // get request takes not data
}

export interface TrezoaPayTransactionRequestPostRequest {
  account: Address;
}

export function validateTrezoaPayRequestUrl(url: URL): void {
  if (url.protocol !== "https:") {
    throw new Error("URL must use HTTPS protocol");
  }
}
