import { createCodamaConfig } from "../core";

describe("createCodamaConfig", () => {
  const idl = "anchor/target/idl/counter.json";
  const clientJs = "anchor/src/client/js";
  const clientRust = "anchor/src/client/rust";

  it("should return accept minimal arguments", () => {
    const config = createCodamaConfig({
      clientJs,
      idl,
    });

    expect(config).toMatchObject({
      idl,
      scripts: {
        js: {
          args: [
            clientJs,
            {
              dependencyMap: {
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
              },
            },
          ],
          from: "@trezoa/renderers-js",
        },
      },
    });
    expect(config.scripts).not.toHaveProperty("rust");
  });

  it("should return accept rust client", () => {
    const config = createCodamaConfig({
      idl,
      clientJs,
      clientRust,
    });

    expect(config).toMatchObject({
      idl,
      scripts: {
        js: {
          args: [
            clientJs,
            {
              dependencyMap: {
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
              },
            },
          ],
          from: "@trezoa/renderers-js",
        },
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
      },
    });
  });
});
