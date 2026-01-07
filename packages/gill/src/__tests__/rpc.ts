import assert from "node:assert";

import { getPublicTrezoaRpcUrl } from "../core";

describe("getPublicTrezoaRpcUrl", () => {
  test("getPublicTrezoaRpcUrl returns mainnet-beta url", () => {
    const rpcUrl = getPublicTrezoaRpcUrl("mainnet-beta");
    assert.equal(rpcUrl, "https://api.mainnet-beta.trezoa.com");
  });
  test("getPublicTrezoaRpcUrl returns mainnet url", () => {
    const rpcUrl = getPublicTrezoaRpcUrl("mainnet");
    assert.equal(rpcUrl, "https://api.mainnet-beta.trezoa.com");
  });
  test("getPublicTrezoaRpcUrl returns devnet url", () => {
    const rpcUrl = getPublicTrezoaRpcUrl("devnet");
    assert.equal(rpcUrl, "https://api.devnet.trezoa.com");
  });
  test("getPublicTrezoaRpcUrl returns testnet url", () => {
    const rpcUrl = getPublicTrezoaRpcUrl("testnet");
    assert.equal(rpcUrl, "https://api.testnet.trezoa.com");
  });
  test("getPublicTrezoaRpcUrl returns localnet url", () => {
    const rpcUrl = getPublicTrezoaRpcUrl("localnet");
    assert.equal(rpcUrl, "http://127.0.0.1:8899");
  });
  test("getPublicTrezoaRpcUrl returns localhost url", () => {
    const rpcUrl = getPublicTrezoaRpcUrl("localhost");
    assert.equal(rpcUrl, "http://127.0.0.1:8899");
  });
  test("getPublicTrezoaRpcUrl show throw error on unsupported moniker", () => {
    // @ts-expect-error - `not-supported` is not a valid moniker
    assert.throws(() => getPublicTrezoaRpcUrl("not-supported"), Error);
  });
  test("getPublicTrezoaRpcUrl show throw error on a url provided", () => {
    // @ts-expect-error - urls are not supported
    assert.throws(() => getPublicTrezoaRpcUrl("https://google.com"), Error);
  });
});
