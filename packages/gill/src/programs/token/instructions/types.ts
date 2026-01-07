import type { TOKEN_2022_PROGRAM_ADDRESS } from "@trezoa-program/token-2022";
import type { Address, KeyPairSigner, TransactionSigner } from "@trezoa/kit";
import type { TOKEN_PROGRAM_ADDRESS } from "../addresses";

export type TokenInstructionBase<TMint = KeyPairSigner | Address> = {
  /** Signer that will pay for the rent storage deposit fee and transaction fees */
  feePayer: Address | TransactionSigner;
  /** Token mint to issue the tokens */
  mint: TMint;
  /**
   * Token program used to create the token's `mint`
   *
   * - (default) {@link TOKEN_PROGRAM_ADDRESS} - the original TPL Token Program
   * - {@link TOKEN_2022_PROGRAM_ADDRESS} - the TPL Token Extensions Program (aka Token22)
   **/
  tokenProgram?: Address;
};
