import assert from "node:assert";

import { createTrezoaClient } from "../core";

describe("createTrezoaClient", () => {
  test("supports major cluster monikers and urls", () => {
    assert.doesNotThrow(() => {
      createTrezoaClient({ urlOrMoniker: "mainnet" });
      createTrezoaClient({ urlOrMoniker: "devnet" });
      createTrezoaClient({ urlOrMoniker: "testnet" });
      createTrezoaClient({ urlOrMoniker: "localnet" });
      createTrezoaClient({ urlOrMoniker: "https://example-rpc.com" });
    });
  });
  test("throws on invalid moniker", () => {
    assert.throws(() => createTrezoaClient({ urlOrMoniker: "invalid" }), "Invalid moniker");
  });
  test("throws on invalid and unsupported urls", () => {
    assert.throws(() => createTrezoaClient({ urlOrMoniker: "http//invalid" }), "Invalid url");
    assert.throws(() => createTrezoaClient({ urlOrMoniker: "ftp://invalid" }), "Unsupported protocol");
  });
});
