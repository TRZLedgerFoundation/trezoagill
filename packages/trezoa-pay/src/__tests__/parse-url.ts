import { type Address } from "trezoagill";
import assert from "node:assert";
import { parseTrezoaPayURL, TrezoaPayTransactionRequestURL, type TrezoaPayTransferRequestURL } from "../parse-url.js";

describe("parseTrezoaPayURL", () => {
  const pubkey = "nick6zJc6HpW3kfBm4xS2dmbuVRyb5F3AnUvj5ymzR5" as Address;

  describe("TrezoaPayTransactionRequestURL", () => {
    it("should parse with only a url", () => {
      const url = `trezoa:${"https://trezoagill.com"}`;

      const { label, message, link } = parseTrezoaPayURL(url) as TrezoaPayTransactionRequestURL;

      // should add trailing slash
      assert.equal(link, "https://trezoagill.com/");
      assert.equal(label, undefined);
      assert.equal(message, undefined);
    });

    it("should parse with Trezoa Pay query params", () => {
      const data = {
        link: "https://trezoagill.com/",
        message: "Message",
        label: "Label",
      };
      const url = `trezoa:${data.link}?label=${data.label}&message=${data.message}`;

      const { label, message, link } = parseTrezoaPayURL(url) as TrezoaPayTransactionRequestURL;

      assert.equal(link, data.link);
      assert.equal(label, data.label);
      assert.equal(message, data.message);
    });

    it("should parse with link with query params", () => {
      const data = {
        link: "https://trezoagill.com/?query=param",
      };
      const url = `trezoa:${encodeURIComponent(data.link)}`;

      const { label, message, link } = parseTrezoaPayURL(url) as TrezoaPayTransactionRequestURL;

      assert.equal(link, data.link);
      assert.equal(label, undefined);
      assert.equal(message, undefined);
    });

    it("should parse with link with query params and Trezoa Pay query params", () => {
      const data = {
        link: "https://trezoagill.com/?query=param",
        message: "Message",
        label: "Label",
      };
      const url = `trezoa:${encodeURIComponent(data.link)}?label=${data.label}&message=${data.message}`;

      const { label, message, link } = parseTrezoaPayURL(url) as TrezoaPayTransactionRequestURL;

      assert.equal(link, data.link);
      assert.equal(label, data.label);
      assert.equal(message, data.message);
    });
  });

  describe("TrezoaPayTransferRequestURL", () => {
    it("should parse with only address", () => {
      const url = "trezoa:nick6zJc6HpW3kfBm4xS2dmbuVRyb5F3AnUvj5ymzR5";

      const { recipient, amount, splToken, reference, label, message, memo } = parseTrezoaPayURL(
        url,
      ) as TrezoaPayTransferRequestURL;

      assert.equal(recipient, pubkey);
      assert.equal(amount, undefined);
      assert.equal(splToken, undefined);
      assert.equal(reference, undefined);
      assert.equal(label, undefined);
      assert.equal(message, undefined);
      assert.equal(memo, undefined);
    });

    it("should parse successfully", () => {
      const url =
        "trezoa:nick6zJc6HpW3kfBm4xS2dmbuVRyb5F3AnUvj5ymzR5?amount=0.000000001&reference=82ZJ7nbGpixjeDCmEhUcmwXYfvurzAgGdtSMuHnUgyny&label=Michael&message=Thanks%20for%20all%20the%20fish&memo=OrderId5678";

      const { recipient, amount, splToken, reference, label, message, memo } = parseTrezoaPayURL(
        url,
      ) as TrezoaPayTransferRequestURL;

      assert.equal(recipient, pubkey);
      assert.equal(amount, 0.000000001);
      assert.equal(splToken, undefined);
      assert.equal(reference?.length, 1);
      assert.equal(reference![0], "82ZJ7nbGpixjeDCmEhUcmwXYfvurzAgGdtSMuHnUgyny");
      assert.equal(label, "Michael");
      assert.equal(message, "Thanks for all the fish");
      assert.equal(memo, "OrderId5678");
    });

    it("should parse with tpl-token", () => {
      const url =
        "trezoa:nick6zJc6HpW3kfBm4xS2dmbuVRyb5F3AnUvj5ymzR5?amount=1.01&tpl-token=82ZJ7nbGpixjeDCmEhUcmwXYfvurzAgGdtSMuHnUgyny&label=Michael&message=Thanks%20for%20all%20the%20fish&memo=OrderId5678";

      const { recipient, amount, splToken, reference, label, message, memo } = parseTrezoaPayURL(
        url,
      ) as TrezoaPayTransferRequestURL;

      assert.equal(recipient, pubkey);
      assert.equal(amount, 1.01);
      assert.equal(splToken, "82ZJ7nbGpixjeDCmEhUcmwXYfvurzAgGdtSMuHnUgyny");
      assert.equal(reference, undefined);
      assert.equal(label, "Michael");
      assert.equal(message, "Thanks for all the fish");
      assert.equal(memo, "OrderId5678");
    });

    it("should parse multiple references", () => {
      const url =
        "trezoa:nick6zJc6HpW3kfBm4xS2dmbuVRyb5F3AnUvj5ymzR5?reference=82ZJ7nbGpixjeDCmEhUcmwXYfvurzAgGdtSMuHnUgyny&reference=mvines9iiHiQTysrwkJjGf2gb9Ex9jXJX8ns3qwf2kN";

      const { recipient, amount, splToken, reference, label, message, memo } = parseTrezoaPayURL(
        url,
      ) as TrezoaPayTransferRequestURL;

      assert.equal(recipient, pubkey);
      assert.equal(reference?.length, 2);
      assert.equal(reference![0], "82ZJ7nbGpixjeDCmEhUcmwXYfvurzAgGdtSMuHnUgyny");
      assert.equal(reference![1], "mvines9iiHiQTysrwkJjGf2gb9Ex9jXJX8ns3qwf2kN");
      assert.equal(amount, undefined);
      assert.equal(splToken, undefined);
      assert.equal(label, undefined);
      assert.equal(message, undefined);
      assert.equal(memo, undefined);
    });

    it("should parse without an amount", () => {
      const url =
        "trezoa:nick6zJc6HpW3kfBm4xS2dmbuVRyb5F3AnUvj5ymzR5?reference=82ZJ7nbGpixjeDCmEhUcmwXYfvurzAgGdtSMuHnUgyny&label=Michael&message=Thanks%20for%20all%20the%20fish&memo=OrderId5678";

      const { recipient, amount, splToken, reference, label, message, memo } = parseTrezoaPayURL(
        url,
      ) as TrezoaPayTransferRequestURL;

      assert.equal(recipient, pubkey);
      expect(amount).toBeUndefined();
      assert.equal(splToken, undefined);
      assert.equal(reference?.length, 1);
      assert.equal(reference![0], "82ZJ7nbGpixjeDCmEhUcmwXYfvurzAgGdtSMuHnUgyny");
      assert.equal(label, "Michael");
      assert.equal(message, "Thanks for all the fish");
      assert.equal(memo, "OrderId5678");
    });

    it("should parse with only amount", () => {
      const url = "trezoa:nick6zJc6HpW3kfBm4xS2dmbuVRyb5F3AnUvj5ymzR5?amount=0.000000001";

      const { recipient, amount, splToken, reference, label, message, memo } = parseTrezoaPayURL(
        url,
      ) as TrezoaPayTransferRequestURL;

      assert.equal(recipient, pubkey);
      assert.equal(amount, 0.000000001);
      assert.equal(splToken, undefined);
      assert.equal(reference, undefined);
      assert.equal(label, undefined);
      assert.equal(message, undefined);
      assert.equal(memo, undefined);
    });
  });

  describe("errors", () => {
    it("throws an error on invalid length", () => {
      const url = "X".repeat(2049);
      expect(() => parseTrezoaPayURL(url)).toThrow("length invalid");
    });

    it("throws an error on invalid protocol", () => {
      const url = "eth:0xffff";
      expect(() => parseTrezoaPayURL(url)).toThrow("protocol invalid");
    });

    it("throws an error on invalid recipient", () => {
      const url = "trezoa:0xffff";
      expect(() => parseTrezoaPayURL(url)).toThrow("recipient invalid");
    });

    it.each([
      // various invalid numbers
      ["1milliondollars"],
      [-0.1],
      [-100],
    ])("throws an error on invalid amount: %p", (amount) => {
      const url = `trezoa:nick6zJc6HpW3kfBm4xS2dmbuVRyb5F3AnUvj5ymzR5?amount=${amount}`;

      expect(() => parseTrezoaPayURL(url)).toThrow("amount invalid");
    });

    it("throws an error on invalid token", () => {
      const url = "trezoa:nick6zJc6HpW3kfBm4xS2dmbuVRyb5F3AnUvj5ymzR5?amount=1&tpl-token=0xffff";

      expect(() => parseTrezoaPayURL(url)).toThrow("tpl-token invalid");
    });

    it("throws an error on invalid reference", () => {
      const url = "trezoa:nick6zJc6HpW3kfBm4xS2dmbuVRyb5F3AnUvj5ymzR5?amount=1&reference=0xffff";

      expect(() => parseTrezoaPayURL(url)).toThrow("reference invalid");
    });
  });
});
