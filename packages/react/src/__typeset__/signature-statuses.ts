import { Signature, TrezoaRpcResponse } from "trezoagill";
import { useSignatureStatuses } from "../hooks/signature-statuses.js";

// [DESCRIBE] useSignatureStatuses
{
  const signature = null as unknown as Signature;
  const signatures = [signature];

  const { statuses } = useSignatureStatuses({ signatures });
  statuses satisfies TrezoaRpcResponse<any>["value"];
}
