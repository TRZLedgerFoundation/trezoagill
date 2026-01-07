import type { Signature, SignatureBytes } from "@trezoa/kit";
import { getBase58Decoder } from "@trezoa/kit";

/**
 * Converts signature bytes to a {@link Signature} string.
 * @param sigBytes - The signature bytes to convert
 * @returns The base58-encoded signature string
 */
export function getSignatureFromBytes(sigBytes: SignatureBytes): Signature {
  return getBase58Decoder().decode(sigBytes) as Signature;
}
