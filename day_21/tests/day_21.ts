import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Day21 } from "../target/types/day_21";

describe("day_21", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Day21 as Program<Day21>;

  // the following is the Solana wallet we are using
  let pubkey = new anchor.web3.PublicKey("14daYtTrYmn6KfkGYeWMKNJ6iQEZD3eLUozCzjL13ucS");

  it("reads the account balance", async () => {
    // Add your test here.
    const tx = await program.methods.readBalance().accounts({ acct: pubkey }).rpc();
    console.log("Your transaction signature", tx);
  });
});
