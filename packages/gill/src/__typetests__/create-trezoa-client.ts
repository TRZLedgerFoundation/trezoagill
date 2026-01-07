import type {
  RequestAirdropApi,
  Rpc,
  RpcDevnet,
  RpcMainnet,
  RpcTestnet,
  TrezoaRpcApi,
  TrezoaRpcApiMainnet,
} from "@trezoa/kit";
import { sendAndConfirmDurableNonceTransactionFactory, sendAndConfirmTransactionFactory } from "@trezoa/kit";
import { createTrezoaClient } from "../core";

// [DESCRIBE] createTrezoaClient
{
  // Mainnet cluster typechecks when the providing the moniker
  {
    const {
      rpc: mainnetRpc,
      rpcSubscriptions: mainnetRpcSubscriptions,
      simulateTransaction,
    } = createTrezoaClient({
      urlOrMoniker: "mainnet",
    });
    mainnetRpc satisfies Rpc<TrezoaRpcApiMainnet>;
    mainnetRpc satisfies RpcMainnet<TrezoaRpcApiMainnet>;
    //@ts-expect-error Should not have `requestAirdrop` method
    mainnetRpc satisfies Rpc<RequestAirdropApi>;
    //@ts-expect-error Should not be a devnet RPC
    mainnetRpc satisfies RpcDevnet<TrezoaRpcApi>;
    //@ts-expect-error Should not be a testnet RPC
    mainnetRpc satisfies RpcTestnet<TrezoaRpcApi>;

    // should have access to `simulateTransaction`
    simulateTransaction;

    sendAndConfirmTransactionFactory({
      rpc: mainnetRpc,
      rpcSubscriptions: mainnetRpcSubscriptions,
    });
    sendAndConfirmDurableNonceTransactionFactory({
      rpc: mainnetRpc,
      rpcSubscriptions: mainnetRpcSubscriptions,
    });
  }

  // Devnet cluster typechecks when the providing the moniker
  {
    const {
      rpc: devnetRpc,
      rpcSubscriptions: devnetRpcSubscriptions,
      simulateTransaction,
    } = createTrezoaClient({
      urlOrMoniker: "devnet",
    });
    devnetRpc satisfies Rpc<TrezoaRpcApi>;
    devnetRpc satisfies Rpc<RequestAirdropApi>;
    devnetRpc satisfies RpcDevnet<TrezoaRpcApi>;
    //@ts-expect-error Should not be a testnet RPC
    devnetRpc satisfies RpcTestnet<TrezoaRpcApi>;
    //@ts-expect-error Should not be a mainnet RPC
    devnetRpc satisfies RpcMainnet<TrezoaRpcApiMainnet>;

    // should have access to `simulateTransaction`
    simulateTransaction;

    sendAndConfirmTransactionFactory({
      rpc: devnetRpc,
      rpcSubscriptions: devnetRpcSubscriptions,
    });
    sendAndConfirmDurableNonceTransactionFactory({
      rpc: devnetRpc,
      rpcSubscriptions: devnetRpcSubscriptions,
    });
  }

  // Testnet cluster typechecks when the providing the moniker
  {
    const {
      rpc: testnetRpc,
      rpcSubscriptions: testnetRpcSubscriptions,
      simulateTransaction,
    } = createTrezoaClient({
      urlOrMoniker: "testnet",
    });
    testnetRpc satisfies Rpc<TrezoaRpcApi>;
    testnetRpc satisfies Rpc<RequestAirdropApi>;
    testnetRpc satisfies RpcTestnet<TrezoaRpcApi>;
    //@ts-expect-error Should not be a devnet RPC
    testnetRpc satisfies RpcDevnet<TrezoaRpcApi>;
    //@ts-expect-error Should not be a mainnet RPC
    testnetRpc satisfies RpcMainnet<TrezoaRpcApiMainnet>;

    // should have access to `simulateTransaction`
    simulateTransaction;

    sendAndConfirmTransactionFactory({
      rpc: testnetRpc,
      rpcSubscriptions: testnetRpcSubscriptions,
    });
    sendAndConfirmDurableNonceTransactionFactory({
      rpc: testnetRpc,
      rpcSubscriptions: testnetRpcSubscriptions,
    });
  }

  // Localnet cluster typechecks when the providing the moniker
  {
    const {
      rpc: localnetRpc,
      rpcSubscriptions: localnetRpcSubscriptions,
      simulateTransaction,
    } = createTrezoaClient({
      urlOrMoniker: "localnet",
    });
    localnetRpc satisfies Rpc<TrezoaRpcApi>;
    localnetRpc satisfies Rpc<RequestAirdropApi>;
    //@ts-expect-error Should not be a testnet RPC
    localnetRpc satisfies RpcTestnet<TrezoaRpcApi>;
    //@ts-expect-error Should not be a devnet RPC
    localnetRpc satisfies RpcDevnet<TrezoaRpcApi>;
    //@ts-expect-error Should not be a mainnet RPC
    localnetRpc satisfies RpcMainnet<TrezoaRpcApiMainnet>;

    // should have access to `simulateTransaction`
    simulateTransaction;

    sendAndConfirmTransactionFactory({
      rpc: localnetRpc,
      // @ts-ignore - kit does not yet support `localnet` as a cluster
      rpcSubscriptions: localnetRpcSubscriptions,
    });
    sendAndConfirmDurableNonceTransactionFactory({
      rpc: localnetRpc,
      // @ts-ignore - kit does not yet support `localnet` as a cluster
      rpcSubscriptions: localnetRpcSubscriptions,
    });
  }

  // Localnet cluster typechecks when the providing the moniker
  {
    const {
      rpc: genericRpc,
      rpcSubscriptions: genericRpcSubscriptions,
      simulateTransaction,
    } = createTrezoaClient({
      urlOrMoniker: "https://example-rpc.com",
    });
    genericRpc satisfies Rpc<TrezoaRpcApi>;
    genericRpc satisfies Rpc<RequestAirdropApi>;
    //@ts-expect-error Should not be a testnet RPC
    genericRpc satisfies RpcTestnet<TrezoaRpcApi>;
    //@ts-expect-error Should not be a devnet RPC
    genericRpc satisfies RpcDevnet<TrezoaRpcApi>;
    //@ts-expect-error Should not be a mainnet RPC
    genericRpc satisfies RpcMainnet<TrezoaRpcApiMainnet>;

    // should have access to `simulateTransaction`
    simulateTransaction;

    sendAndConfirmTransactionFactory({
      rpc: genericRpc,
      rpcSubscriptions: genericRpcSubscriptions,
    });
    sendAndConfirmDurableNonceTransactionFactory({
      rpc: genericRpc,
      rpcSubscriptions: genericRpcSubscriptions,
    });
  }
}
