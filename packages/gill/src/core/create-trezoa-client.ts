import type { DevnetUrl, MainnetUrl, TestnetUrl } from "@trezoa/kit";
import { createTrezoaRpc, createTrezoaRpcSubscriptions } from "@trezoa/kit";

import type { CreateTrezoaClientArgs, LocalnetUrl, ModifiedClusterUrl, TrezoaClient } from "../types/rpc";
import { getPublicTrezoaRpcUrl } from "./rpc";
import { sendAndConfirmTransactionWithSignersFactory } from "./send-and-confirm-transaction-with-signers";
import { simulateTransactionFactory } from "./simulate-transaction";

/**
 * Create a Trezoa `rpc` and `rpcSubscriptions` client
 */
export function createTrezoaClient(
  props: Omit<CreateTrezoaClientArgs<MainnetUrl | "mainnet">, "urlOrMoniker"> & {
    urlOrMoniker: "mainnet";
  },
): TrezoaClient<MainnetUrl>;
export function createTrezoaClient(
  props: Omit<CreateTrezoaClientArgs<DevnetUrl | "devnet">, "urlOrMoniker"> & {
    urlOrMoniker: "devnet";
  },
): TrezoaClient<DevnetUrl>;
export function createTrezoaClient(
  props: Omit<CreateTrezoaClientArgs<TestnetUrl | "testnet">, "urlOrMoniker"> & {
    urlOrMoniker: "testnet";
  },
): TrezoaClient<TestnetUrl>;
export function createTrezoaClient(
  props: Omit<CreateTrezoaClientArgs<LocalnetUrl | "localnet">, "urlOrMoniker"> & {
    urlOrMoniker: "localnet";
  },
): TrezoaClient<LocalnetUrl>;
export function createTrezoaClient<TClusterUrl extends ModifiedClusterUrl>(
  props: CreateTrezoaClientArgs<TClusterUrl>,
): TrezoaClient<TClusterUrl>;
export function createTrezoaClient<TCluster extends ModifiedClusterUrl>({
  urlOrMoniker,
  rpcConfig,
  rpcSubscriptionsConfig,
}: CreateTrezoaClientArgs<TCluster>) {
  if (!urlOrMoniker) throw new Error("Cluster url or moniker is required");
  if (urlOrMoniker instanceof URL == false) {
    try {
      urlOrMoniker = new URL(urlOrMoniker.toString());
    } catch (err) {
      try {
        urlOrMoniker = new URL(getPublicTrezoaRpcUrl(urlOrMoniker.toString() as any));
      } catch (err) {
        throw new Error("Invalid URL or cluster moniker");
      }
    }
  }

  if (!urlOrMoniker.protocol.match(/^https?/i)) {
    throw new Error("Unsupported protocol. Only HTTP and HTTPS are supported");
  }

  if (rpcConfig?.port) {
    urlOrMoniker.port = rpcConfig.port.toString();
  }

  const rpc = createTrezoaRpc<TCluster>(urlOrMoniker.toString() as TCluster, rpcConfig);

  urlOrMoniker.protocol = urlOrMoniker.protocol.replace("http", "ws");

  if (rpcSubscriptionsConfig?.port) {
    urlOrMoniker.port = rpcSubscriptionsConfig.port.toString();
  } else if (urlOrMoniker.hostname == "localhost" || urlOrMoniker.hostname.startsWith("127")) {
    urlOrMoniker.port = "8900";
  }

  const rpcSubscriptions = createTrezoaRpcSubscriptions<TCluster>(
    urlOrMoniker.toString() as TCluster,
    rpcSubscriptionsConfig,
  );

  return {
    rpc,
    rpcSubscriptions,
    sendAndConfirmTransaction: sendAndConfirmTransactionWithSignersFactory({
      // @ts-ignore - TODO(FIXME:nick)
      rpc,
      // @ts-ignore - TODO(FIXME:nick)
      rpcSubscriptions,
    }),
    // @ts-ignore
    simulateTransaction: simulateTransactionFactory({ rpc }),
    urlOrMoniker: urlOrMoniker.toString() as TCluster,
  };
}
