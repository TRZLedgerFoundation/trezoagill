import type { Mint } from "@trezoa-program/token-2022";
import type { Account, Address } from "@trezoa/kit";
import {
  isAddress,
  TREZOA_ERROR__ACCOUNTS__ACCOUNT_NOT_FOUND,
  TREZOA_ERROR__ACCOUNTS__FAILED_TO_DECODE_ACCOUNT,
  TrezoaError,
} from "@trezoa/kit";

export function assertIsMint<TAddress extends string = string>(
  accountOrAddress: Account<Mint, TAddress> | Address<TAddress>,
): asserts accountOrAddress is Account<Mint, TAddress> {
  if (isAddress(accountOrAddress as Address)) {
    throw new TrezoaError(TREZOA_ERROR__ACCOUNTS__ACCOUNT_NOT_FOUND, { address: accountOrAddress as Address });
  }

  if ("data" in accountOrAddress === false || "mintAuthority" in accountOrAddress.data === false) {
    throw new TrezoaError(TREZOA_ERROR__ACCOUNTS__FAILED_TO_DECODE_ACCOUNT, { address: accountOrAddress as Address });
  }
}
