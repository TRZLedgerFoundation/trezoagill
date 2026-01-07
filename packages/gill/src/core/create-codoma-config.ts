/**
 * Codama dependency map to utilize trezoagill imports
 */
export const GILL_EXTERNAL_MODULE_MAP: Record<string, string> = {
  trezoaAccounts: "trezoagill",
  trezoaAddresses: "trezoagill",
  trezoaCodecsCore: "trezoagill",
  trezoaCodecsDataStructures: "trezoagill",
  trezoaCodecsNumbers: "trezoagill",
  trezoaCodecsStrings: "trezoagill",
  trezoaErrors: "trezoagill",
  trezoaInstructions: "trezoagill",
  trezoaOptions: "trezoagill",
  trezoaPrograms: "trezoagill",
  trezoaRpcTypes: "trezoagill",
  trezoaSigners: "trezoagill",
};

/**
 * Create a Codama CLI configuration to generate a program client from an IDL.
 * Normally saved to `codama.js`.
 *
 * @example
 * ```ts
 * import { createCodamaConfig } from "trezoagill";
 *
 * export default createCodamaConfig({
 *  idl: "program/idl.json",
 *  clientJs: "clients/js/src/generated",
 *  // clientRust: "clients/rust/src/generated",
 * });
 * ```
 */
export function createCodamaConfig({
  idl,
  clientJs,
  clientRust,
  dependencyMap = GILL_EXTERNAL_MODULE_MAP,
}: {
  idl: string;
  clientJs: string;
  clientRust?: string;
  dependencyMap?: Record<string, string>;
}) {
  return {
    idl,
    scripts: {
      js: {
        args: [clientJs, { dependencyMap }],
        from: "@trezoa/renderers-js",
      },
      ...(clientRust && {
        rust: {
          from: "@trezoa/renderers-rust",
          args: [
            clientRust,
            {
              crateFolder: "clients/rust",
              formatCode: true,
            },
          ],
        },
      }),
    },
  };
}
