import type { DevnetUrl, MainnetUrl, TestnetUrl } from "@trezoa/kit";
import type { LocalnetUrl, ModifiedClusterUrl, TrezoaClusterMoniker } from "../types/rpc";

export function localnet(putativeString: string): LocalnetUrl {
  return putativeString as LocalnetUrl;
}

/**
 * Get a public Trezoa RPC endpoint for a cluster based on its moniker
 *
 * Note: These RPC URLs are rate limited and not suitable for production applications.
 */
export function getPublicTrezoaRpcUrl(
  cluster: TrezoaClusterMoniker | "mainnet-beta" | "localhost",
): ModifiedClusterUrl {
  switch (cluster) {
    case "devnet":
      return "https://api.devnet.trezoa.com" as DevnetUrl;
    case "testnet":
      return "https://api.testnet.trezoa.com" as TestnetUrl;
    case "mainnet-beta":
    case "mainnet":
      return "https://api.mainnet-beta.trezoa.com" as MainnetUrl;
    case "localnet":
    case "localhost":
      return "http://127.0.0.1:8899" as LocalnetUrl;
    default:
      throw new Error("Invalid cluster moniker");
  }
}
