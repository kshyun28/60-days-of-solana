import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Day24 } from "../target/types/day_24";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
const expect = chai.expect;

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

describe("day_24", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Day24 as Program<Day24>;

  it("should update value", async () => {
    const alice = anchor.web3.Keypair.generate();
    const bob = anchor.web3.Keypair.generate();

    await airdropSol(alice.publicKey, 1); // 1 SOL
    await airdropSol(bob.publicKey, 1); // 1 SOL

    let seeds = [];
    const [myStorage, _bump] = anchor.web3.PublicKey.findProgramAddressSync(seeds, program.programId);

    // ALICE INITIALIZE ACCOUNT
    await program.methods.initialize().accounts({
      myStorage: myStorage,
      fren: alice.publicKey
    }).signers([alice]).rpc();

    // BOB WRITE TO ACCOUNT
    await program.methods.updateValue(new anchor.BN(3)).accounts({
      myStorage: myStorage,
      fren: bob.publicKey
    }).signers([bob]).rpc();

    let value = await program.account.myStorage.fetch(myStorage);
    console.log(`value stored is ${value.x}`);
  });

  it("should transfer points from Alice to Bob", async () => {
    const alice = anchor.web3.Keypair.generate();
    const bob = anchor.web3.Keypair.generate();

    await airdropSol(alice.publicKey, 1); // 1 SOL
    await airdropSol(bob.publicKey, 1); // 1 SOL

    let seeds_alice = [alice.publicKey.toBytes()];
    const [playerAlice, _bumpA] = anchor.web3.PublicKey.findProgramAddressSync(seeds_alice, program.programId);

    let seeds_bob = [bob.publicKey.toBytes()];
    const [playerBob, _bumpB] = anchor.web3.PublicKey.findProgramAddressSync(seeds_bob, program.programId);

    // Alice and Bob initialize their accounts
    await program.methods.initialize2().accounts({
      player: playerAlice,
      signer: alice.publicKey,
    }).signers([alice]).rpc();

    await program.methods.initialize2().accounts({
      player: playerBob,
      signer: bob.publicKey,
    }).signers([bob]).rpc();

    // Alice transfers 5 points to Bob. Note that this is a u32
    // so we don't need a BigNum
    await program.methods.transferPoints(5).accounts({
      from: playerAlice,
      to: playerBob,
      authority: alice.publicKey,
    }).signers([alice]).rpc();

    console.log(`Alice has ${(await program.account.player.fetch(playerAlice)).points} points`);
    console.log(`Bob has ${(await program.account.player.fetch(playerBob)).points} points`)
  });

  it("should prevent Alice from transferring more points than her balance", async () => {
    const alice = anchor.web3.Keypair.generate();
    const bob = anchor.web3.Keypair.generate();

    await airdropSol(alice.publicKey, 1); // 1 SOL
    await airdropSol(bob.publicKey, 1); // 1 SOL

    let seeds_alice = [alice.publicKey.toBytes()];
    const [playerAlice, _bumpA] = anchor.web3.PublicKey.findProgramAddressSync(seeds_alice, program.programId);

    let seeds_bob = [bob.publicKey.toBytes()];
    const [playerBob, _bumpB] = anchor.web3.PublicKey.findProgramAddressSync(seeds_bob, program.programId);

    // Alice and Bob initialize their accounts
    await program.methods.initialize2().accounts({
      player: playerAlice,
      signer: alice.publicKey,
    }).signers([alice]).rpc();

    await program.methods.initialize2().accounts({
      player: playerBob,
      signer: bob.publicKey,
    }).signers([bob]).rpc();

    // Alice transfers 15 points to Bob, which exceeds her points balance of 10
    const transferToBob = program.methods.transferPoints(15).accounts({
      from: playerAlice,
      to: playerBob,
      authority: alice.publicKey,
    }).signers([alice]).rpc();

    await expect(transferToBob).to.be.eventually.rejected;

    console.log(`Alice has ${(await program.account.player.fetch(playerAlice)).points} points`);
    console.log(`Bob has ${(await program.account.player.fetch(playerBob)).points} points`)
  });

  it("should prevent Mallory from stealing points", async () => {
    const alice = anchor.web3.Keypair.generate();
    const bob = anchor.web3.Keypair.generate();
    const mallory = anchor.web3.Keypair.generate();

    await airdropSol(alice.publicKey, 1); // 1 SOL
    await airdropSol(bob.publicKey, 1); // 1 SOL
    await airdropSol(mallory.publicKey, 1); // 1 SOL

    let seeds_alice = [alice.publicKey.toBytes()];
    const [playerAlice, _bumpA] = anchor.web3.PublicKey.findProgramAddressSync(seeds_alice, program.programId);

    let seeds_bob = [bob.publicKey.toBytes()];
    const [playerBob, _bumpB] = anchor.web3.PublicKey.findProgramAddressSync(seeds_bob, program.programId);

    let seeds_mallory = [mallory.publicKey.toBytes()];
    const [playerMallory, _bumpC] = anchor.web3.PublicKey.findProgramAddressSync(seeds_mallory, program.programId);

    // Alice, Bob, and Mallory initialize their accounts
    await program.methods.initialize2().accounts({
      player: playerAlice,
      signer: alice.publicKey,
    }).signers([alice]).rpc();

    await program.methods.initialize2().accounts({
      player: playerBob,
      signer: bob.publicKey,
    }).signers([bob]).rpc();

    await program.methods.initialize2().accounts({
      player: playerMallory,
      signer: mallory.publicKey,
    }).signers([mallory]).rpc();

    // This will throw an error
    const stealFromAlice = program.methods.transferPoints(5).accounts({
      from: playerAlice,
      to: playerMallory,
      authority: mallory.publicKey,
    }).signers([mallory]).rpc();

    await expect(stealFromAlice).to.be.eventually.rejected;

    // This will also throw an error
    const stealFromBob = program.methods.transferPoints(5).accounts({
      from: playerBob,
      to: playerMallory,
      authority: mallory.publicKey,
    }).signers([mallory]).rpc();

    await expect(stealFromBob).to.be.eventually.rejected;

    console.log(`Alice has ${(await program.account.player.fetch(playerAlice)).points} points`);
    console.log(`Bob has ${(await program.account.player.fetch(playerBob)).points} points`)
    console.log(`Mallory has ${(await program.account.player.fetch(playerMallory)).points} points`)
  });
});
