import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Day19 } from "../target/types/day_19";

describe("day_19", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Day19 as Program<Day19>;

  it("Initialize and set mapping value", async () => {
    const key = new anchor.BN(42);
    const value = new anchor.BN(1337);

    const seeds = [key.toArrayLike(Buffer, "le", 8)];
    let valueAccount = anchor.web3.PublicKey.findProgramAddressSync(
      seeds,
      program.programId,
    )[0];

    await program.methods.initializeMapping(key).accounts({ val: valueAccount }).rpc();
    await program.methods.setMapping(key, value).accounts({ val: valueAccount }).rpc();

    // read the account back
    let result = await program.account.val.fetch(valueAccount);
    console.log(`the value ${result.value} was stored in ${valueAccount.toBase58()}`);
  });

  it("Initialize and set nested mapping value", async () => {
    const key1 = new anchor.BN(42);
    const key2 = new anchor.BN(43);
    const key3 = new anchor.BN(44);
    const value = new anchor.BN(1337);

    const seeds = [
      key1.toArrayLike(Buffer, "le", 8),
      key2.toArrayLike(Buffer, "le", 8),
      key3.toArrayLike(Buffer, "le", 8)
    ];
    let valueAccount = anchor.web3.PublicKey.findProgramAddressSync(
      seeds,
      program.programId,
    )[0];

    await program.methods.initializeNestedMapping(key1, key2, key3).accounts({ val: valueAccount }).rpc();
    await program.methods.setNestedMapping(key1, key2, key3, value).accounts({ val: valueAccount }).rpc();

    // read the account back
    let result = await program.account.val.fetch(valueAccount);
    console.log(`the value ${result.value} was stored in ${valueAccount.toBase58()}`);

  });

  // it("Initialize and set multiple mapping values", async () => {
  //   const whichMap1 = new anchor.BN(1);
  //   const whichMap2 = new anchor.BN(2);
  //   const key1 = new anchor.BN(42);
  //   const key2 = new anchor.BN(43);
  //   const value1 = new anchor.BN(1337);
  //   const value2 = new anchor.BN(420);

  //   const seeds = [
  //     whichMap1.toArrayLike(Buffer, "le", 8),
  //     key1.toArrayLike(Buffer, "le", 8),
  //     key2.toArrayLike(Buffer, "le", 8),
  //   ];
  //   let valueAccount = anchor.web3.PublicKey.findProgramAddressSync(
  //     seeds,
  //     program.programId,
  //   )[0];

  //   await program.methods.initializeMultipleMappings(whichMap1, key1, key2).accounts({ val: valueAccount }).rpc();
  //   await program.methods.setMultipleMappings(whichMap1, key1, key2, value1).accounts({ val: valueAccount }).rpc();

  //   // read the account back
  //   let result1 = await program.account.val.fetch(valueAccount);
  //   console.log(`the value ${result1.value} was stored in ${valueAccount.toBase58()}`);


  //   await program.methods.initializeMultipleMappings(whichMap2, key1, key2).accounts({ val: valueAccount }).rpc();
  //   await program.methods.setMultipleMappings(whichMap2, key1, key2, value2).accounts({ val: valueAccount }).rpc();

  //   // read the account back
  //   let result = await program.account.val.fetch(valueAccount);
  //   console.log(`the value ${result.value} was stored in ${valueAccount.toBase58()}`);

  // });
});
