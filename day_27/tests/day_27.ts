import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Day27 } from "../target/types/day_27";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
const expect = chai.expect;

describe("day_27", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Day27 as Program<Day27>;

  it("Is initialized!", async () => {
    const [myPda, _bump] = anchor.web3.PublicKey.findProgramAddressSync([], program.programId);
    await program.methods.increment().accounts({ myPda: myPda }).rpc();
    await program.methods.increment().accounts({ myPda: myPda }).rpc();
    await program.methods.increment().accounts({ myPda: myPda }).rpc();

    let result = await program.account.myPda.fetch(myPda);
    console.log(`counter is ${result.counter}`);
  });

  // it("should initialize after giving to system program or draining lamports", async () => {
  //   const [yourPda, _bump] = anchor.web3.PublicKey.findProgramAddressSync([], program.programId);

  //   await program.methods.initialize().accounts({ yourPda: yourPda }).rpc();

  //   await program.methods.giveToSystemProgram().accounts({ yourPda: yourPda }).rpc();

  //   await program.methods.initialize().accounts({ yourPda: yourPda }).rpc();
  //   console.log("account initialized after giving to system program!")

  //   await program.methods.drainLamports().accounts({ yourPda: yourPda }).rpc();

  //   await program.methods.initialize().accounts({ yourPda: yourPda }).rpc();
  //   console.log("account initialized after draining lamports!")
  // });

  // it("should fail to initialize again after erasing the account discriminator", async () => {
  //   const [yourPda, _bump] = anchor.web3.PublicKey.findProgramAddressSync([], program.programId);

  //   await program.methods.initialize().accounts({ yourPda: yourPda }).rpc();

  //   await program.methods.erase().accounts({ yourPda: yourPda }).rpc();
  //   console.log("account discriminator erased")

  //   const initializeAgain = program.methods.initialize().accounts({ yourPda: yourPda }).rpc();
  //   await expect(initializeAgain).to.be.eventually.rejected;
  //   console.log("account did not initialize again")
  // });
});
