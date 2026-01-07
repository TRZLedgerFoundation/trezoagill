"use client";

import { useQuery } from "@tanstack/react-query";
import type { GetSlotApi, Simplify } from "trezoagill";

import { GILL_HOOK_CLIENT_KEY } from "../const.js";
import { useTrezoaClient } from "./client.js";
import type { GillUseRpcHook } from "./types.js";

type RpcConfig = Simplify<Parameters<GetSlotApi["getSlot"]>>[0];

type UseSlotResponse = ReturnType<GetSlotApi["getSlot"]>;

type UseSlotInput<TConfig extends RpcConfig = RpcConfig> = GillUseRpcHook<TConfig>;

/**
 * Get the current slot using the Trezoa RPC method of
 * [`getSlot`](https://trezoa.com/docs/rpc/http/getslot)
 *
 * To auto refetch the slot, provide a `options.refetchInterval` value
 */
export function useSlot<TConfig extends RpcConfig = RpcConfig>({
  options,
  config,
  abortSignal,
}: UseSlotInput<TConfig> = {}) {
  const { rpc, urlOrMoniker } = useTrezoaClient();

  const { data, ...rest } = useQuery({
    ...options,
    queryFn: async () => {
      const slot = await rpc.getSlot(config).send({ abortSignal });
      return slot;
    },
    queryKey: [GILL_HOOK_CLIENT_KEY, urlOrMoniker, "getSlot"],
  });

  return {
    ...rest,
    slot: data as UseSlotResponse,
  };
}
