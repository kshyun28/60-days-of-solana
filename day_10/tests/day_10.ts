import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Day10 } from "../target/types/day_10";

describe("day_10", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Day10 as Program<Day10>;

  it("Example 1: non-public functions", async () => {
    // Add your test here.
    const tx = await program.methods.example1().rpc();
    console.log("Your transaction signature", tx);
  });

  it("Example 2: internal and private functions", async () => {
    // Add your test here.
    const tx = await program.methods.example2().rpc();
    console.log("Your transaction signature", tx);
  });

  it("Example 3: contract inheritance", async () => {
    // Add your test here.
    const tx = await program.methods.addTwoNumbers(new anchor.BN(2), new anchor.BN(8)).rpc();
    console.log("Your transaction signature", tx);
  });

  it("Example 4: call private-like function", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
