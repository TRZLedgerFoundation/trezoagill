import type { TrezoaClusterMoniker } from "./rpc";

type ExplorerLinkAccount = {
  address: string;
};
type ExplorerLinkTransaction = {
  transaction: string;
};
type ExplorerLinkBlock = {
  block: string;
};

/**
 * @param cluster - Default: `mainnet`
 */
export type GetExplorerLinkArgs = {
  cluster?: TrezoaClusterMoniker | "mainnet-beta" | "localhost";
} & (ExplorerLinkAccount | ExplorerLinkTransaction | ExplorerLinkBlock | {});
