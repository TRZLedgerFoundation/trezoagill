// @ts-ignore - Patch BigInt to allow calling `JSON.stringify` on objects that use
interface BigInt {
  /** Convert a BigInt to string form when calling `JSON.stringify()` */
  toJSON: () => string;
}

// @ts-ignore - Only add the toJSON method if it doesn't already exist
if (BigInt.prototype.toJSON === undefined) {
  // @ts-ignore - toJSON does not exist which is why we are patching it
  BigInt.prototype.toJSON = function () {
    return String(this);
  };
}

export * from "./const.js";
export * from "./hooks/index.js";
export * from "./providers.js";

/**
 * Reexporting the Trezoa Wallet Standard functionality allows trezoagill to
 * provide a cohesive developer experience
 */
export * from "@trezoa/react";
export * from "@trezoa/wallet-standard-chains";
export * from "@trezoa/wallet-standard-features";
export * from "@wallet-standard/core";
export * from "@wallet-standard/react";
export * from "@wallet-standard/ui";
