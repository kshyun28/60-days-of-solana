import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Day23 } from "../target/types/day_23";

describe("day_23", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Day23 as Program<Day23>;

  async function printAccountBalance(account) {
    const balance = await anchor.getProvider().connection.getBalance(account);
    console.log(`${account} has ${balance / anchor.web3.LAMPORTS_PER_SOL} SOL`);
  }

  it("transfers SOL", async () => {
    // generate a new wallet
    const recipient = anchor.web3.Keypair.generate();

    await printAccountBalance(recipient.publicKey);

    // send the account 1 SOL via the program
    let amount = new anchor.BN(1 * anchor.web3.LAMPORTS_PER_SOL);
    await program.methods.sendSol(amount)
      .accounts({ recipient: recipient.publicKey })
      .rpc();

    await printAccountBalance(recipient.publicKey);
  });

  it("splits SOL to two recipients", async () => {
    // generate a new wallet
    const recipient1 = anchor.web3.Keypair.generate();
    const recipient2 = anchor.web3.Keypair.generate();

    await printAccountBalance(recipient1.publicKey);
    await printAccountBalance(recipient2.publicKey);

    // send the account 1 SOL via the program
    let amount = new anchor.BN(1 * anchor.web3.LAMPORTS_PER_SOL);
    await program.methods.splitSol(amount)
      .accounts({ recipient1: recipient1.publicKey, recipient2: recipient2.publicKey })
      .rpc();

    await printAccountBalance(recipient1.publicKey);
    await printAccountBalance(recipient2.publicKey);
  });

  it("splits SOL to multiple recipients", async () => {
    const recipient1 = anchor.web3.Keypair.generate();
    const recipient2 = anchor.web3.Keypair.generate();
    const recipient3 = anchor.web3.Keypair.generate();

    await printAccountBalance(recipient1.publicKey);
    await printAccountBalance(recipient2.publicKey);
    await printAccountBalance(recipient3.publicKey);

    const accountMeta1 = { pubkey: recipient1.publicKey, isWritable: true, isSigner: false };
    const accountMeta2 = { pubkey: recipient2.publicKey, isWritable: true, isSigner: false };
    const accountMeta3 = { pubkey: recipient3.publicKey, isWritable: true, isSigner: false };

    let amount = new anchor.BN(1 * anchor.web3.LAMPORTS_PER_SOL);
    await program.methods.splitSolDynamic(amount)
      .remainingAccounts([accountMeta1, accountMeta2, accountMeta3])
      .rpc();

    await printAccountBalance(recipient1.publicKey);
    await printAccountBalance(recipient2.publicKey);
    await printAccountBalance(recipient3.publicKey);
  });
});
