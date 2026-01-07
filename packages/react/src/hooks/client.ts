import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTrezoaClient, type TrezoaClient } from "trezoagill";

import { GILL_HOOK_CLIENT_KEY } from "../const.js";

/**
 * Get the current Trezoa client (including `rpc` and `rpcSubscriptions`)
 */
export function useTrezoaClient(): TrezoaClient {
  const { data: config } = useQuery<TrezoaClient>({
    // fallback data should not be reached if used within `TrezoaProvider`
    // since we set the initial value. but just in case => devnet
    initialData: createTrezoaClient({
      urlOrMoniker: "devnet",
    }),
    queryKey: [GILL_HOOK_CLIENT_KEY],
    staleTime: Infinity,
  });
  return config;
}

/**
 * Update your Trezoa client (including `rpc` and `rpcSubscriptions`)
 */
export function useUpdateTrezoaClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newClient: TrezoaClient): Promise<void> => {
      queryClient.setQueryData([GILL_HOOK_CLIENT_KEY], newClient);

      return await Promise.resolve();
    },
  });
}
