import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Day20 } from "../target/types/day_20";

describe("day_20", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Day20 as Program<Day20>;

  it("computes rent for an empty account", async () => {
    const tx = await program.methods.computeEmptyAccount().rpc();
    console.log("Your transaction signature", tx);
  });

  it("computes rent for a non-empty account", async () => {
    const tx = await program.methods.computeNonEmptyAccount().rpc();
    console.log("Your transaction signature", tx);
  });

  it("initializes storage, then reallocs storage", async () => {
    const seeds = []
    const [myStorage, _bump] = anchor.web3.PublicKey.findProgramAddressSync(seeds, program.programId);

    const tx = await program.methods.initializeStorage().accounts({ myStorage: myStorage }).rpc();
    console.log("Your transaction signature", tx);

    await program.methods.increaseAccountSize().accounts({ myStorage: myStorage }).rpc();
  });
});
