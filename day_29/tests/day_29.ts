import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Day29 } from "../target/types/day_29";
import bs58 from 'bs58';

describe("day_29", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Day29 as Program<Day29>;

  it("Initializes a storage account", async () => {
    const seeds = []
    const [myStorage, _bump] = anchor.web3.PublicKey.findProgramAddressSync(seeds, program.programId);

    await program.methods.initialize().accounts({ myStorage: myStorage }).rpc();

    console.log(`program: ${program.programId.toBase58()}`);
    console.log(`storage account: ${myStorage.toBase58()}`);

    /*
      Base58 Addresses:
      - Solana Wallet Address: "Ga6VV426xwCaN1J7yT7qr4ysyLhhJ5w3agUGMTexrZwL"
      - Solana Program Address: "2CP2vQejbXmYgTknYjsBiC3Tkz5rc6kDwRrqUcRiKPoN"
      - Solana Storage Account Address: "5QQLsXarZdg6Mc23tayHUQ9XDBVcqyhdKQkBAAhJeT2v"
      - Solana ProgramData Address: "Td763Uyr6rpyS2Sj7fk8MVsFC1amE83zYAW4KARoj45"

      Hex Addresses:
      - Solana Wallet Address: "e759aded0fb89d0320607a3b8ad40d39acb0aa4a0d0e18917a0065eb9d408687"
      - Solana ProgramData Address hex: "06d1eccec4ca2207aaad32b24dd0b74358539fcfd99719a44b110ad10d6ff2ea"

      To view the program:
      - `solana account 2CP2vQejbXmYgTknYjsBiC3Tkz5rc6kDwRrqUcRiKPoN`
      ```
      Public Key: 2CP2vQejbXmYgTknYjsBiC3Tkz5rc6kDwRrqUcRiKPoN
      Balance: 0.00114144 SOL
      Owner: BPFLoaderUpgradeab1e11111111111111111111111
      Executable: false
      Rent Epoch: 18446744073709551615
      Length: 36 (0x24) bytes
      0000:   02 00 00 00  06 d1 ec ce  c4 ca 22 07  aa ad 32 b2   .........."...2.
      0010:   4d d0 b7 43  58 53 9f cf  d9 97 19 a4  4b 11 0a d1   M..CXS......K...
      0020:   0d 6f f2 ea
      ```

      To return the "Authority" of the program:
      - `solana program show 2CP2vQejbXmYgTknYjsBiC3Tkz5rc6kDwRrqUcRiKPoN`

      The "Authority" of the program is equal to the "Solana Wallet Address".
      ```
      Program Id: 2CP2vQejbXmYgTknYjsBiC3Tkz5rc6kDwRrqUcRiKPoN
      Owner: BPFLoaderUpgradeab1e11111111111111111111111
      ProgramData Address: Td763Uyr6rpyS2Sj7fk8MVsFC1amE83zYAW4KARoj45
      Authority: Ga6VV426xwCaN1J7yT7qr4ysyLhhJ5w3agUGMTexrZwL
      Last Deployed In Slot: 22907
      Data Length: 196528 (0x2ffb0) bytes
      Balance: 1.36903896 SOL
      ```

      To view the "ProgramData Address" data:
      - `solana account Td763Uyr6rpyS2Sj7fk8MVsFC1amE83zYAW4KARoj45 > tempfile`
      - `head -n 10 tempfile`

      The "Authority" of the program in hex is stored in the data, starting with "e7".
      ```
      Public Key: Td763Uyr6rpyS2Sj7fk8MVsFC1amE83zYAW4KARoj45
      Balance: 1.36903896 SOL
      Owner: BPFLoaderUpgradeab1e11111111111111111111111
      Executable: false
      Rent Epoch: 18446744073709551615
      Length: 196573 (0x2ffdd) bytes
      0000:   03 00 00 00  7b 59 00 00  00 00 00 00  01 e7 59 ad   ....{Y........Y.
      0010:   ed 0f b8 9d  03 20 60 7a  3b 8a d4 0d  39 ac b0 aa   ..... `z;...9...
      0020:   4a 0d 0e 18  91 7a 00 65  eb 9d 40 86  87 7f 45 4c   J....z.e..@...EL
      ```
    */
    const solanaAddress = 'Ga6VV426xwCaN1J7yT7qr4ysyLhhJ5w3agUGMTexrZwL'
    const solanaAddressBytes = bs58.decode(solanaAddress);
    const solanaAddressHex = Buffer.from(solanaAddressBytes).toString('hex');
    console.log(`Solana address hex: "${solanaAddressHex}"`)

    /* 
      Solana deployed program "ProgramData Address": "Td763Uyr6rpyS2Sj7fk8MVsFC1amE83zYAW4KARoj45"

      The ProgramData Address stores the bytecode of the program.
    */
    const solanaProgramDataAddress = 'Td763Uyr6rpyS2Sj7fk8MVsFC1amE83zYAW4KARoj45'
    const solanaProgramDataAddressBytes = bs58.decode(solanaProgramDataAddress);
    const solanaProgramDataAddressHex = Buffer.from(solanaProgramDataAddressBytes).toString('hex');
    console.log(`Solana ProgramData Address hex: "${solanaProgramDataAddressHex}"`)
  });

});
