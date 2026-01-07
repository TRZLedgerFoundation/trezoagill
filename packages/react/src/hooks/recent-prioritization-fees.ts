"use client";

import { useQuery } from "@tanstack/react-query";
import type { GetRecentPrioritizationFeesApi, Simplify } from "trezoagill";

import { GILL_HOOK_CLIENT_KEY } from "../const.js";
import { useTrezoaClient } from "./client.js";
import type { GillUseRpcHook } from "./types.js";

type UseRecentPrioritizationFeesInput = Simplify<
  Pick<GillUseRpcHook<{}>, "abortSignal" | "options"> & {
    addresses?: Parameters<GetRecentPrioritizationFeesApi["getRecentPrioritizationFees"]>[0];
  }
>;

type UseRecentPrioritizationFeesResponse = ReturnType<GetRecentPrioritizationFeesApi["getRecentPrioritizationFees"]>;

/**
 * Get the recent prioritization fees for a list of addresses using the Trezoa RPC method of
 * [`getRecentPrioritizationFees`](https://trezoa.com/docs/rpc/http/getrecentprioritizationfees)
 */
export function useRecentPrioritizationFees({
  options,
  abortSignal,
  addresses,
}: UseRecentPrioritizationFeesInput = {}) {
  const { rpc, urlOrMoniker } = useTrezoaClient();

  const { data, ...rest } = useQuery({
    ...options,
    queryFn: async () => {
      const fees = await rpc.getRecentPrioritizationFees(addresses).send({ abortSignal });
      return fees;
    },
    queryKey: [GILL_HOOK_CLIENT_KEY, urlOrMoniker, "getRecentPrioritizationFees", addresses],
  });

  return {
    ...rest,
    fees: data as UseRecentPrioritizationFeesResponse,
  };
}
