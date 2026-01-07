/* eslint-disable @typescript-eslint/ban-ts-comment */
import type {
  TrezoaPayTransactionRequestGetResponse,
  TrezoaPayTransactionRequestGetResponseParsed,
  TrezoaPayTransactionRequestPostResponse,
  TrezoaPayTransactionRequestPostResponseParsed,
} from "../response.js";

// [DESCRIBE] Wire and Parsed types have matching keys
{
  // GET response: wire and parsed types must have the same keys
  type _GetWireKeys = keyof TrezoaPayTransactionRequestGetResponse;
  type _GetParsedKeys = keyof TrezoaPayTransactionRequestGetResponseParsed;

  // Assert bidirectional key compatibility
  null as unknown as _GetWireKeys satisfies _GetParsedKeys;
  null as unknown as _GetParsedKeys satisfies _GetWireKeys;

  // POST response: wire and parsed types must have the same keys
  type _PostWireKeys = keyof TrezoaPayTransactionRequestPostResponse;
  type _PostParsedKeys = keyof TrezoaPayTransactionRequestPostResponseParsed;

  // Assert bidirectional key compatibility
  null as unknown as _PostWireKeys satisfies _PostParsedKeys;
  null as unknown as _PostParsedKeys satisfies _PostWireKeys;
}
