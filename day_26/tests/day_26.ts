import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Day26 } from "../target/types/day_26";

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

describe("day_26", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Day26 as Program<Day26>;

  it("Is initialized!", async () => {
    console.log("program address", program.programId.toBase58());    

    const seeds = [];
    const [pda, bump_] = anchor.web3.PublicKey.findProgramAddressSync(seeds, program.programId);

    console.log("owner of pda before initialize:",
                (await anchor.getProvider().connection.getAccountInfo(pda)));

    await program.methods.initializePda()
      .accounts({pda: pda}).rpc();

    console.log("owner of pda after initialize:",
                (await anchor.getProvider().connection.getAccountInfo(pda)).owner.toBase58());

    // To check the owner of the PDA, use the Solana CLI `solana account <address>`
    console.log("address of PDA", pda.toBase58());

    let keypair = anchor.web3.Keypair.generate();

    console.log("owner of keypair before airdrop:",
                await anchor.getProvider().connection.getAccountInfo(keypair.publicKey));

    await airdropSol(keypair.publicKey, 1); // 1 SOL
   
    console.log("owner of keypair after airdrop:",
                (await anchor.getProvider().connection.getAccountInfo(keypair.publicKey)).owner.toBase58());
    
    await program.methods.initializeKeypair()
      .accounts({keypair: keypair.publicKey})
      .signers([keypair]) // the signer must be the keypair
      .rpc();

    console.log("owner of keypair after initialize:",
                (await anchor.getProvider().connection.getAccountInfo(keypair.publicKey)).owner.toBase58());

    // To check the owner of the keypair, use the Solana CLI `solana account <address>`
    console.log("address of keypair", keypair.publicKey.toBase58());
  });

  // it("Should change owner", async () => {
  //   const seeds = []
  //   const [myStorage, _bump] = anchor.web3.PublicKey.findProgramAddressSync(seeds, program.programId);

  //   console.log("the storage account address is", myStorage.toBase58());

  //   console.log("owner before first initialization:",
  //               (await anchor.getProvider().connection.getAccountInfo(myStorage)));

  //   await program.methods.initialize().accounts({myStorage: myStorage}).rpc();
    
  //   console.log("owner after first initialization:",
  //   (await anchor.getProvider().connection.getAccountInfo(myStorage)).owner.toBase58());

  //   await program.methods.changeOwner().accounts({myStorage: myStorage}).rpc();
    
  //   console.log("owner after changing owner:",
  //               (await anchor.getProvider().connection.getAccountInfo(myStorage)).owner.toBase58());

	// 	// after the ownership has been transferred
	// 	// the account can still be initialized again
	// 	await program.methods.initialize().accounts({myStorage: myStorage}).rpc();

  //   console.log("owner after second initialization:",
  //   (await anchor.getProvider().connection.getAccountInfo(myStorage)).owner.toBase58());
  // });

  // it("Should crowdfund", async () => {
  //   const programId = await program.programId;

  //   let seeds = [];
  //   let pdaAccount = anchor.web3.PublicKey.findProgramAddressSync(seeds, programId)[0];

  //   const tx = await program.methods.initializeCrowdfund().accounts({
  //     pda: pdaAccount
  //   }).rpc();

  //   // transfer 2 SOL
  //   const tx2 = await program.methods.donate(new anchor.BN(2_000_000_000)).accounts({
  //     pda: pdaAccount
  //   }).rpc();

  //   console.log("lamport balance of pdaAccount",
	// 							await anchor.getProvider().connection.getBalance(pdaAccount));

  //   // transfer back 1 SOL
	// 	// the signer is the permitted address
  //   await program.methods.withdraw(new anchor.BN(1_000_000_000)).accounts({
  //     pda: pdaAccount
  //   }).rpc();

  //   console.log("lamport balance of pdaAccount",
	// 						  await anchor.getProvider().connection.getBalance(pdaAccount));
  // });
});
