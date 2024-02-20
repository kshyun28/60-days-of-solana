import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Day7 } from "../target/types/day_7";

describe("day_7", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Day7 as Program<Day7>;

  it("non-copy type borrowing: &", async () => {
    // Add your test here.
    const tx = await program.methods.borrowing().rpc();
    console.log("Your transaction signature", tx);
  });

  it("non-copy type cloning", async () => {
    // Add your test here.
    const tx = await program.methods.cloning().rpc();
    console.log("Your transaction signature", tx);
  });

  it("mut keyword", async () => {
    // Add your test here.
    const tx = await program.methods.mutKeyword().rpc();
    console.log("Your transaction signature", tx);
  });

  it("generics", async () => {
    // Add your test here.
    const tx = await program.methods.generics().rpc();
    console.log("Your transaction signature", tx);
  });

  it("options, enums, and deref", async () => {
    // Add your test here.
    const tx = await program.methods.optionsEnumsDeref().rpc();
    console.log("Your transaction signature", tx);
  });

  it("? operator", async () => {
    // Add your test here.
    const tx = await program.methods.encodeAndDecode().rpc();
    console.log("Your transaction signature", tx);
  });
});
