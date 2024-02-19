import * as anchor from "@coral-xyz/anchor";
import { Program, AnchorError } from "@coral-xyz/anchor"
import { Day4 } from "../target/types/day4";
import { assert } from "chai";

describe("day4", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Day4 as Program<Day4>;

  it("Input test", async () => {
    // Add your test here.
    try {
      const tx = await program.methods.limitRange(new anchor.BN(9)).rpc();
      console.log("Your transaction signature", tx);
    } catch (_err) {
      assert.isTrue(_err instanceof AnchorError);
      const err: AnchorError = _err;
      const errMsg =
        "a is too small";
      assert.strictEqual(err.error.errorMessage, errMsg);
      console.log("Error number:", err.error.errorCode.number);
    }

    try {
      const tx = await program.methods.limitRange(new anchor.BN(101)).rpc();
      console.log("Your transaction signature", tx);
    } catch (_err) {
      assert.isTrue(_err instanceof AnchorError);
      const err: AnchorError = _err;
      const errMsg =
        "a is too big";
      assert.strictEqual(err.error.errorMessage, errMsg);
      console.log("Error number:", err.error.errorCode.number);
    }
  });

  it("Error test", async () => {
    // Add your test here.
    try {
      const tx = await program.methods.func().rpc();
      console.log("Your transaction signature", tx);
    } catch (_err) {
      assert.isTrue(_err instanceof AnchorError);
      const err: AnchorError = _err;
      const errMsg =
        "Always errors";
      assert.strictEqual(err.error.errorMessage, errMsg);
      console.log("Error number:", err.error.errorCode.number);
    }
  });
});