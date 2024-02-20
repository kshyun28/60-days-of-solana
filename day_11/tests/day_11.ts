import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Day11 } from "../target/types/day_11";

describe("day_11", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Day11 as Program<Day11>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });

  it("Get day of the week", async () => {
    const tx = await program.methods.getDayOfTheWeek().rpc();
    console.log("Your transaction signature", tx);
  });
});
