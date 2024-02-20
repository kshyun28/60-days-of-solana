import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Day8 } from "../target/types/day_8";

describe("day_8", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Day8 as Program<Day8>;

  it("logs function", async () => {
    // Add your test here.
    const tx = await program.methods.logsFunction().rpc();
    console.log("Your transaction signature", tx);
  });

  it("logs macro", async () => {
    // Add your test here.
    const tx = await program.methods.logsMacro().rpc();
    console.log("Your transaction signature", tx);
  });
});
