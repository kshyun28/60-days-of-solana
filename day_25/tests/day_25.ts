import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Day25 } from "../target/types/day_25";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
const expect = chai.expect;

// Change this to your path, run `solana config get` in your CLI.
import privateKey from '/Users/jaspergabriel/.config/solana/id.json';

// this airdrops sol to an address
async function airdropSol(publicKey, amount) {
  let airdropTx = await anchor.getProvider().connection.requestAirdrop(publicKey, amount * anchor.web3.LAMPORTS_PER_SOL);
  await confirmTransaction(airdropTx);
}

async function confirmTransaction(tx) {
  const latestBlockHash = await anchor.getProvider().connection.getLatestBlockhash();
  await anchor.getProvider().connection.confirmTransaction({
    blockhash: latestBlockHash.blockhash,
    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    signature: tx,
  });
}

describe("day_25", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const deployer = anchor.web3.Keypair.fromSecretKey(Uint8Array.from(privateKey));

  const program = anchor.workspace.Day25 as Program<Day25>;

  it("Is initialized -- PDA version", async () => {
    const seeds = []
    const [myPda, _bump] = anchor.web3.PublicKey.findProgramAddressSync(seeds, program.programId);

    console.log("the storage account address is", myPda.toBase58());

    const tx = await program.methods.initializePda().accounts({ myPda: myPda }).rpc();
  });

  it("Is initialized -- keypair version", async () => {
    const newKeypair = anchor.web3.Keypair.generate();
    await airdropSol(newKeypair.publicKey, 1); // 1 SOL

    console.log("the keypair account address is", newKeypair.publicKey.toBase58());

    await program.methods.initializeKeypairAccount()
      .accounts({ myKeypairAccount: newKeypair.publicKey })
      .signers([newKeypair]) // the signer must be the keypair
      .rpc();
  });

  it("Should not initialize a keypair account without the private key", async () => {
    const newKeypair = anchor.web3.Keypair.generate();
    const secondKeypair = anchor.web3.Keypair.generate();
    await airdropSol(newKeypair.publicKey, 1); // 1 SOL

    console.log("the keypair account address is", newKeypair.publicKey.toBase58());

    const seeds = []
    const [pda, _bump] = anchor.web3.PublicKey.findProgramAddressSync(seeds, program.programId);

    const initializeWithSecondKeypair = program.methods.initializeKeypairAccount()
      .accounts({ myKeypairAccount: secondKeypair.publicKey })
      .signers([newKeypair]) // the signer must be the keypair
      .rpc();

    await expect(initializeWithSecondKeypair).to.be.eventually.rejected;

    const initializeWithPDA = program.methods.initializeKeypairAccount()
      .accounts({ myKeypairAccount: pda })
      .signers([newKeypair]) // the signer must be the keypair
      .rpc();

    await expect(initializeWithPDA).to.be.eventually.rejected;
  });

  it("Writing to keypair account fails", async () => {
    const newKeypair = anchor.web3.Keypair.generate();
    const recieverWallet = anchor.web3.Keypair.generate();

    await airdropSol(newKeypair.publicKey, 10);

    const transaction1 = new anchor.web3.Transaction().add(
      anchor.web3.SystemProgram.transfer({
        fromPubkey: newKeypair.publicKey,
        toPubkey: recieverWallet.publicKey,
        lamports: 1 * anchor.web3.LAMPORTS_PER_SOL,
      }),
    );
    await anchor.web3.sendAndConfirmTransaction(anchor.getProvider().connection, transaction1, [newKeypair]);
    console.log('sent 1 lamport')

    await program.methods.initializeKeypairAccount()
      .accounts({ myKeypairAccount: newKeypair.publicKey })
      .signers([newKeypair]) // the signer must be the keypair
      .rpc();

    console.log("initialized");

    // try to transfer again, this fails
    const transaction2 = new anchor.web3.Transaction().add(
      anchor.web3.SystemProgram.transfer({
        fromPubkey: newKeypair.publicKey,
        toPubkey: recieverWallet.publicKey,
        lamports: 1 * anchor.web3.LAMPORTS_PER_SOL,
      }),
    );
    const transferAgain = anchor.web3.sendAndConfirmTransaction(anchor.getProvider().connection, transaction2, [newKeypair]);

    await expect(transferAgain).to.be.eventually.rejected;
  });

  it("Console logs account owner", async () => {
    console.log(`The program address is ${program.programId}`)
    const newKeypair = anchor.web3.Keypair.generate();
    const recieverWallet = anchor.web3.Keypair.generate();

    // get account owner before initialization
    await airdropSol(newKeypair.publicKey, 10);
    const accountInfoBefore = await anchor.getProvider().connection.getAccountInfo(newKeypair.publicKey);
    console.log(`initial keypair account owner is ${accountInfoBefore.owner}`);

    await program.methods.initializeKeypairAccount()
      .accounts({ myKeypairAccount: newKeypair.publicKey })
      .signers([newKeypair]) // the signer must be the keypair
      .rpc();

    // get account owner after initialization
    const accountInfoAfter = await anchor.getProvider().connection.getAccountInfo(newKeypair.publicKey);
    console.log(`initial keypair account owner is ${accountInfoAfter.owner}`);
  });
});
