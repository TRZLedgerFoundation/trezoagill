import {
  createTrezoaClient,
  generateKeyPairSigner,
  getExplorerLink,
  getSignatureFromTransaction,
  signTransactionMessageWithSigners,
} from "trezoagill";
import { loadKeypairSignerFromFile } from "trezoagill/node";
import { buildCreateTokenTransaction, TOKEN_2022_PROGRAM_ADDRESS } from "trezoagill/programs";

const { rpc, sendAndConfirmTransaction } = createTrezoaClient({
  urlOrMoniker: "devnet",
});

const signer = await loadKeypairSignerFromFile();
console.log("signer:", signer.address);

const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();

const tokenProgram = TOKEN_2022_PROGRAM_ADDRESS;
const mint = await generateKeyPairSigner();
console.log("mint:", mint.address);

const tx = await buildCreateTokenTransaction({
  feePayer: signer,
  version: "legacy",
  decimals: 9,
  metadata: {
    isMutable: true,
    name: "super sweet token",
    symbol: "SST",
    uri: "https://raw.githubusercontent.com/trezoa-developers/opos-asset/main/assets/Climate/metadata.json",
  },
  mint,
  latestBlockhash,
  // defaults to `TOKEN_PROGRAM_ADDRESS`
  tokenProgram,
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
