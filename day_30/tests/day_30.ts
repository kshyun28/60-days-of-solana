import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Day30 } from "../target/types/day_30";

describe("day_30", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Day30 as Program<Day30>;

  it("Should close an account after initializing", async () => {
    let [thePda, _bump] = anchor.web3.PublicKey.findProgramAddressSync([], program.programId);
    await program.methods.initialize().accounts({ thePda: thePda }).rpc();
    await program.methods.delete().accounts({ thePda: thePda }).rpc();

    let account = await program.account.thePda.fetchNullable(thePda);
    console.log(account)
  });

  it("Should initialize an account again after closing", async () => {
    let [thePda, _bump] = anchor.web3.PublicKey.findProgramAddressSync([], program.programId);
    await program.methods.initialize().accounts({ thePda: thePda }).rpc();
    await program.methods.delete().accounts({ thePda: thePda }).rpc();

    let account = await program.account.thePda.fetchNullable(thePda);
    console.log(account)

    await program.methods.initialize().accounts({ thePda: thePda }).rpc();
    account = await program.account.thePda.fetchNullable(thePda);
    console.log(account)
  });
});
