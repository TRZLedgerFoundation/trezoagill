import type {
  createTrezoaRpc,
  createTrezoaRpcSubscriptions,
  DevnetUrl,
  MainnetUrl,
  RpcFromTransport,
  RpcSubscriptions,
  RpcTransportFromClusterUrl,
  TrezoaRpcApiFromTransport,
  TrezoaRpcSubscriptionsApi,
  TestnetUrl,
} from "@trezoa/kit";

import { SendAndConfirmTransactionWithSignersFunction } from "../core/send-and-confirm-transaction-with-signers";
import type { SimulateTransactionFunction } from "../core/simulate-transaction";

/** Trezoa cluster moniker */
export type TrezoaClusterMoniker = "devnet" | "localnet" | "mainnet" | "testnet";

export type LocalnetUrl = string & { "~cluster": "localnet" };

export type GenericUrl = string & {};

export type ModifiedClusterUrl = DevnetUrl | GenericUrl | LocalnetUrl | MainnetUrl | TestnetUrl;

export type TrezoaClientUrlOrMoniker = ModifiedClusterUrl | TrezoaClusterMoniker | URL;

export type CreateTrezoaClientArgs<TClusterUrl extends TrezoaClientUrlOrMoniker = GenericUrl> = {
  /** Configuration used to create the `rpc` client */
  rpcConfig?: Parameters<typeof createTrezoaRpc>[1] & { port?: number };
  /** Configuration used to create the `rpcSubscriptions` client */
  rpcSubscriptionsConfig?: Parameters<typeof createTrezoaRpcSubscriptions>[1] & { port?: number };
  /** Full RPC URL (for a private RPC endpoint) or the Trezoa moniker (for a public RPC endpoint) */
  urlOrMoniker: TrezoaClientUrlOrMoniker | TClusterUrl;
};

export type TrezoaClient<TClusterUrl extends ModifiedClusterUrl | string = string> = {
  /** Used to make RPC calls to your RPC provider */
  rpc: RpcFromTransport<
    TrezoaRpcApiFromTransport<RpcTransportFromClusterUrl<TClusterUrl>>,
    RpcTransportFromClusterUrl<TClusterUrl>
  >;
  /** Used to make RPC websocket calls to your RPC provider */
  rpcSubscriptions: RpcSubscriptions<TrezoaRpcSubscriptionsApi> & TClusterUrl;
  /**
   * Send and confirm a transaction to the network (including signing with available Signers).
   *
   * If the `transaction` does not already have a latest blockhash (and is not already signed), it will be automatically retrieved and applied.
   *
   * Default commitment level: `confirmed`
   */
  sendAndConfirmTransaction: SendAndConfirmTransactionWithSignersFunction;
  /**
   * Simulate a transaction on the network
   */
  simulateTransaction: SimulateTransactionFunction;
  /** Full RPC URL (for a private RPC endpoint) or the Trezoa moniker (for a public RPC endpoint) */
  urlOrMoniker: TrezoaClientUrlOrMoniker | TClusterUrl;
};
