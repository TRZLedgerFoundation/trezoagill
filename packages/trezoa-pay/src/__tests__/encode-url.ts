import assert from "node:assert";

import { type Address } from "trezoagill";
import { encodeTrezoaPayURL } from "../encode-url.js";

describe("encodeTrezoaPayURL", () => {
  describe("TransferRequestURL", () => {
    const recipient = "nick6zJc6HpW3kfBm4xS2dmbuVRyb5F3AnUvj5ymzR5" as Address;
    const splToken = "USDSwr9ApdHk5bvJKMjzff41FfuX8bSxdKcR81vTwcA" as Address;
    const reference1 = "mvines9iiHiQTysrwkJjGf2gb9Ex9jXJX8ns3qwf2kN" as Address;
    const reference2 = "82ZJ7nbGpixjeDCmEhUcmwXYfvurzAgGdtSMuHnUgyny" as Address;
    const label = "label";
    const message = "message";
    const memo = "memo";

    it("encodes a url with only recipient", () => {
      const url = encodeTrezoaPayURL({ recipient });

      assert.equal(String(url), `trezoa:${recipient}`);
    });

    it("encodes a url with recipient and amount", () => {
      const amount = 1;

      const url = encodeTrezoaPayURL({ recipient, amount });

      assert.equal(String(url), `trezoa:${recipient}?amount=1`);
    });

    it("encodes a url with recipient, amount, and token", () => {
      const amount = 1.01;

      const url = encodeTrezoaPayURL({ recipient, amount, splToken });

      assert.equal(String(url), `trezoa:${recipient}?amount=1.01&tpl-token=${splToken}`);
    });

    it("encodes a url with recipient, amount, and single reference", () => {
      const amount = 100000.123456;

      const url = encodeTrezoaPayURL({ recipient, amount, reference: reference1 });

      assert.equal(String(url), `trezoa:${recipient}?amount=100000.123456&reference=${reference1}`);
    });

    it("encodes a url with recipient, amount, and multiple references", () => {
      const amount = 100000.123456;
      const reference = [reference1, reference2];

      const url = encodeTrezoaPayURL({ recipient, amount, reference });

      assert.equal(
        String(url),
        `trezoa:${recipient}?amount=100000.123456&reference=${reference1}&reference=${reference2}`,
      );
    });

    it("encodes a url with recipient, amount, and label", () => {
      const amount = 1.99;

      const url = encodeTrezoaPayURL({ recipient, amount, label });

      assert.equal(String(url), `trezoa:${recipient}?amount=1.99&label=${label}`);
    });

    it("encodes a url with recipient, message, and amount (as integer)", () => {
      const amount = 1;

      const url = encodeTrezoaPayURL({ recipient, amount, message });

      assert.equal(String(url), `trezoa:${recipient}?amount=1&message=${message}`);
    });

    it("encodes a url with recipient, amount, and memo", () => {
      const amount = 100;

      const url = encodeTrezoaPayURL({ recipient, amount, memo });

      assert.equal(String(url), `trezoa:${recipient}?amount=100&memo=${memo}`);
    });

    it("encodes a url with recipient, message, and amount (with lots of decimals)", () => {
      const amount = "0.000000001";

      const url = encodeTrezoaPayURL({ recipient, amount, message });

      assert.equal(String(url), `trezoa:${recipient}?amount=${"0.000000001"}&message=${message}`);
    });

    // it("encodes a URL with all parameters", () => {
    //   const amount: number = 0.000000001;
    //   const reference = [reference1, reference2];

    //   const url = encodeTrezoaPayURL({ recipient, amount, splToken, reference, label, message, memo });

    //   assert.equal(
    //     String(url),
    //     `trezoa:${recipient}?amount=${"0.000000001"}&tpl-token=${splToken}&reference=${reference1}&reference=${reference2}&label=${label}&message=${message}&memo=${memo}`,
    //   );
    // });
  });

  describe("TransactionRequestURL", () => {
    const label = "label";
    const message = "message";

    it("encodes a URL", () => {
      const link = "https://trezoagill.com";

      const url = encodeTrezoaPayURL({ link: new URL(link), label, message });

      assert.equal(String(url), `trezoa:${link}?label=${label}&message=${message}`);
    });

    it("encodes a URL with query parameters", () => {
      const link = "https://trezoagill.com?query=param";

      const url = encodeTrezoaPayURL({ link: new URL(link), label, message });

      assert.equal(String(url), `trezoa:${encodeURIComponent(link)}?label=${label}&message=${message}`);
    });

    it("throws an error for HTTP", () => {
      const link = "http://trezoagill.com?query=param";
      expect(() => encodeTrezoaPayURL({ link: new URL(link) })).toThrow("must use HTTPS protocol");
    });

    it("throws an error for FTP", () => {
      const link = "ftp://trezoagill.com?query=param";
      expect(() => encodeTrezoaPayURL({ link: new URL(link) })).toThrow("must use HTTPS protocol");
    });

    it("throws an error for Trezoa Pay", () => {
      const link = "trezoa://trezoagill.com";
      expect(() => encodeTrezoaPayURL({ link: new URL(link) })).toThrow("must use HTTPS protocol");
    });
  });
});
