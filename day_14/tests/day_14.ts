import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Day14 } from "../target/types/day_14";

describe("day_14", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Day14 as Program<Day14>;

  // generate a signer to call our function
  let signer2 = anchor.web3.Keypair.generate();
  let signer3 = anchor.web3.Keypair.generate();

  it("Is signed by a single signer", async () => {
    // Add your test here.
    const tx = await program.methods.initialize()
      .accounts({
        signer1: program.provider.publicKey,
      })
      .rpc();

    console.log("Your transaction signature", tx);
    console.log("The signer1: ", program.provider.publicKey.toBase58());
  });

  it("Is signed by a two signers", async () => {
    // Add your test here.
    const tx = await program.methods.twoSigners()
      .accounts({
        signer1: program.provider.publicKey,
        signer2: signer2.publicKey,
      })
      .signers([signer2])
      .rpc();

    console.log("Your transaction signature", tx);
    console.log("The signer1: ", program.provider.publicKey.toBase58());
    console.log("The signer2: ", signer2.publicKey.toBase58());
  });

  it("Is signed by a three signers", async () => {
    // Add your test here.
    const tx = await program.methods.threeSigners()
      .accounts({
        signer1: program.provider.publicKey,
        signer2: signer2.publicKey,
        signer3: signer3.publicKey,
      })
      .signers([signer2, signer3])
      .rpc();

    console.log("Your transaction signature", tx);
    console.log("The signer1: ", program.provider.publicKey.toBase58());
    console.log("The signer2: ", signer2.publicKey.toBase58());
    console.log("The signer3: ", signer3.publicKey.toBase58());
  });

  it("Is called by the owner", async () => {
    // Add your test here.
    const tx = await program.methods.onlyOwner()
      .accounts({
        signerAccount: program.provider.publicKey,
      })
      .rpc();

    console.log("Your transaction signature", tx);
    console.log("The owner: ", program.provider.publicKey.toBase58());
  });

  it("Is NOT called by the owner", async () => {
    // Add your test here.
    const tx = await program.methods.onlyOwner()
      .accounts({
        signerAccount: signer2.publicKey,
      })
      .signers([signer2])
      .rpc();

    console.log("Your transaction signature", tx);
  });
});
