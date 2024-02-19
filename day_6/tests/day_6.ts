import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Day6 } from "../target/types/day_6";

describe("day_6", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Day6 as Program<Day6>;

  it("Age checker (if-else)", async () => {
    // Add your test here.
    const tx = await program.methods.ageCheckerIfElse(new anchor.BN(35)).rpc();
    console.log("Your transaction signature", tx);
  });

  it("Age checker (ternary)", async () => {
    // Add your test here.
    const tx = await program.methods.ageCheckerTernary(new anchor.BN(35)).rpc();
    console.log("Your transaction signature", tx);
  });

  it("Age checker (match)", async () => {
    // Add your test here.
    const tx = await program.methods.ageCheckerMatch(new anchor.BN(35)).rpc();
    console.log("Your transaction signature", tx);
  });

  it("for loop", async () => {
    // Add your test here.
    const tx = await program.methods.forLoop().rpc();
    console.log("Your transaction signature", tx);
  });

  it("fixed array", async () => {
    // Add your test here.
    const tx = await program.methods.fixedArray().rpc();
    console.log("Your transaction signature", tx);
  });

  it("dynamic array", async () => {
    // Add your test here.
    const tx = await program.methods.dynamicArray().rpc();
    console.log("Your transaction signature", tx);
  });

  it("HashMap", async () => {
    // Add your test here.
    const tx = await program.methods.hashMap("name", "Bob").rpc();
    console.log("Your transaction signature", tx);
  });

  it("structs", async () => {
    // Add your test here.
    const tx = await program.methods.structs("Alice", new anchor.BN(20)).rpc();
    console.log("Your transaction signature", tx);
  });

  it("constants", async () => {
    // Add your test here.
    const tx = await program.methods.constants().rpc();
    console.log("Your transaction signature", tx);
  });

  it("usize type and casting", async () => {
    // Add your test here.
    const tx = await program.methods.usize().rpc();
    console.log("Your transaction signature", tx);
  });

  it("Exercise: get even numbers", async () => {
    // Add your test here.
    const tx = await program.methods.getEvenNumbers([
      new anchor.BN(1),
      new anchor.BN(2),
      new anchor.BN(3),
      new anchor.BN(4),
      new anchor.BN(5)
    ]).rpc();
    console.log("Your transaction signature", tx);
  });
});
