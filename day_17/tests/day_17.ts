import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Day17 } from "../target/types/day_17";

describe("day_17", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Day17 as Program<Day17>;

  it("Is initialized!", async () => {
    const seeds = [];

    const [myStorage, _bump] = await anchor.web3.PublicKey.findProgramAddressSync(
      seeds,
      program.programId
    );

    console.log("The storage account address is: ", myStorage.toBase58());

    // Add your test here.
    await program.methods.initialize().accounts({ myStorage: myStorage }).rpc();
    await program.methods.set(new anchor.BN(170)).accounts({ myStorage: myStorage }).rpc();
    await program.methods.printX().accounts({ myStorage: myStorage }).rpc();

    // Increment once
    await program.methods.increment().accounts({ myStorage: myStorage }).rpc();
    await program.methods.printX().accounts({ myStorage: myStorage }).rpc();

    // Increment again
    await program.methods.increment().accounts({ myStorage: myStorage }).rpc();
    await program.methods.printX().accounts({ myStorage: myStorage }).rpc();
  });
});
