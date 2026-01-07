"use client";

import { useQuery } from "@tanstack/react-query";
import type { GetLatestBlockhashApi, Simplify } from "trezoagill";

import { GILL_HOOK_CLIENT_KEY } from "../const.js";
import { useTrezoaClient } from "./client.js";
import type { GillUseRpcHook } from "./types.js";

type RpcConfig = Simplify<Parameters<GetLatestBlockhashApi["getLatestBlockhash"]>>[0];

type UseLatestBlockhashResponse = ReturnType<GetLatestBlockhashApi["getLatestBlockhash"]>["value"];

type UseLatestBlockhashInput<TConfig extends RpcConfig = RpcConfig> = GillUseRpcHook<TConfig>;

/**
 * Get the latest blockhash using the Trezoa RPC method of
 * [`getLatestBlockhash`](https://trezoa.com/docs/rpc/http/getlatestblockhash)
 *
 * To auto refetch the latest blockhash, provide a `options.refetchInterval` value
 */
export function useLatestBlockhash<TConfig extends RpcConfig = RpcConfig>({
  options,
  config,
  abortSignal,
}: UseLatestBlockhashInput<TConfig> = {}) {
  const { rpc, urlOrMoniker } = useTrezoaClient();
  const { data, ...rest } = useQuery({
    ...options,
    queryFn: async () => {
      const { value } = await rpc.getLatestBlockhash(config).send({ abortSignal });
      return value;
    },
    queryKey: [GILL_HOOK_CLIENT_KEY, urlOrMoniker, "getLatestBlockhash"],
  });
  return {
    ...rest,
    latestBlockhash: data as UseLatestBlockhashResponse,
  };
}
