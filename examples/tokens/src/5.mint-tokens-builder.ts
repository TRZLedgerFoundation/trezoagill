import {
  address,
  createTrezoaClient,
  getExplorerLink,
  getSignatureFromTransaction,
  signTransactionMessageWithSigners,
} from "trezoagill";
import { loadKeypairSignerFromFile } from "trezoagill/node";
import { buildMintTokensTransaction } from "trezoagill/programs";

const { rpc, sendAndConfirmTransaction } = createTrezoaClient({
  urlOrMoniker: "devnet",
});

const signer = await loadKeypairSignerFromFile();
console.log("signer:", signer.address);

const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();

const mint = address("HwxZNMkZbZMeiu9Xnmc6Rg8jYgNsJB47jwabHGUebW4F");

const owner = address("nicktrLHhYzLmoVbuZQzHUTicd2sfP571orwo9jfc8c");

const tx = await buildMintTokensTransaction({
  feePayer: signer,
  version: "legacy",
  latestBlockhash,
  amount: 1_000_000_000,
  destination: owner,
  mint,
  mintAuthority: signer,
});

const signedTransaction = await signTransactionMessageWithSigners(tx);

console.log(
  "Explorer:",
  getExplorerLink({
    cluster: "devnet",
    transaction: getSignatureFromTransaction(signedTransaction),
  }),
);

await sendAndConfirmTransaction(signedTransaction);
