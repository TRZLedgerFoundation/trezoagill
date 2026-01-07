/**
 * The purpose of this script is to compare some of the differences
 * of using `trezoagill` as a single entrypoint vs `@trezoa/kit`
 * (and the various `@trezoa-program/*` packages).
 *
 * This script is the `trezoagill` version of the comparison.
 * See the `@trezoa/kit` version in the ./basic-compare.ts file
 */
import {
  createTrezoaClient,
  createTransaction,
  getExplorerLink,
  getSignatureFromTransaction,
  signTransactionMessageWithSigners,
} from "trezoagill";
import { loadKeypairSignerFromFile } from "trezoagill/node";
import { getAddMemoInstruction } from "trezoagill/programs";

const { rpc, sendAndConfirmTransaction } = createTrezoaClient({
  urlOrMoniker: "devnet",
});

const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();

const signer = await loadKeypairSignerFromFile();

const tx = createTransaction({
  feePayer: signer,
  instructions: [
    getAddMemoInstruction({
      memo: "gm world!",
    }),
  ],
  latestBlockhash,
  computeUnitLimit: 5000,
  computeUnitPrice: 1000,
});

const signedTransaction = await signTransactionMessageWithSigners(tx);

try {
  console.log(
    "Sending transaction:",
    getExplorerLink({
      cluster: "devnet",
      transaction: getSignatureFromTransaction(signedTransaction),
    }),
  );

  await sendAndConfirmTransaction(signedTransaction);

  console.log("Transaction confirmed!");
} catch (err) {
  console.error("Unable to send and confirm the transaction");
  console.error(err);
}
