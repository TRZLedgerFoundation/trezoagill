"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { TrezoaClient } from "trezoagill";
import React from "react";
import { GILL_HOOK_CLIENT_KEY } from "./const.js";

/**
 * Provider to utilize trezoagill hooks for Trezoa
 */
export function TrezoaProvider({
  client,
  children,
  queryClient = new QueryClient(),
}: {
  client: TrezoaClient;
  children: React.ReactNode;
  queryClient?: QueryClient;
}) {
  queryClient.setQueryData([GILL_HOOK_CLIENT_KEY], client);
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
