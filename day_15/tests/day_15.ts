import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Day15 } from "../target/types/day_15";

describe("day_15", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Day15 as Program<Day15>;

  const defaultKeyPair = new anchor.web3.PublicKey(
    // replace this with your default provider keypair, you can get it by running `solana address` in your terminal
    "Ga6VV426xwCaN1J7yT7qr4ysyLhhJ5w3agUGMTexrZwL"
  );

  it("Is initialized!", async () => {
    // log the keypair's initial balance
    let bal_before = await program.provider.connection.getBalance(
      defaultKeyPair
    );
    console.log("before:", bal_before);

    // call the initialize function of our program
    const tx = await program.methods.initialize().rpc();

    // log the keypair's balance after
    let bal_after = await program.provider.connection.getBalance(
      defaultKeyPair
    );
    console.log("after:", bal_after);

    // log the difference
    console.log(
      "diff:",
      BigInt(bal_before.toString()) - BigInt(bal_after.toString())
    );
  });
});
