# Day 29: Owner vs Authority in Solana

[Day 29](https://www.rareskills.io/post/solana-authority) of [RareSkills Solana Course](https://www.rareskills.io/solana-tutorial).

## Setup

1. Configure Solana to run on localhost: `solana config set --url localhost`
2. Run the test validator node on another terminal: `solana-test-validator --reset`
3. Run Solana logs on another terminal: `solana logs`
4. Build Anchor program: `anchor build`
5. Sync program_id with Anchor key: `anchor keys sync`
6. Run tests: `anchor test --skip-local-validator`

## Notes

### Solana Accounts

- All Solana accounts have the following:
  - Public Key
  - Lamport Balance
  - Owner
  - Executable (boolean)
  - Rent Epoch (ignored for rent-exempt accounts)
  - Data
- To see a Solana account, run the following:
  - `solana address` (to get the wallet address)
  - `solana account <wallet address>`
  ```
  Public Key: Ga6VV426xwCaN1J7yT7qr4ysyLhhJ5w3agUGMTexrZwL
  Balance: 499999995.774382591 SOL
  Owner: 11111111111111111111111111111111
  Executable: false
  Rent Epoch: 18446744073709551615
  ```
- The owner of wallet addresses is the `system program`.
- To transfer out SOL from our account:
  - We send a `signed transaction` to the `system program` to transfer SOL.
  - The `system program` verifies we own the `private key` to the account.
  - Then, the `system program` updates the balance on our behalf.
- Only the `system program` can modify the SOL balance of an `account`.

### Owner

- Only `programs` can write data to `accounts` they own.
- The `owner of an account` is always a `program`.
- The `owner of all Solana programs` is `BPFLoaderUpgradeable111…111`.

### Authority

- An `Authority` is an `address` from which a `program` will accept instructions if it sees a `valid signature`.
- An `Authority` cannot modify an `account` directly.
- `Authority` is not a field that `Solana accounts` hold.
- The `Authority` is stored in the `ProgramData address` where the bytecode of the program is stored.

### Owner vs Authority

- An `owner` of an account is a `program`.
- An `authority` is a `wallet`.
- For writing data to an account:
  - An `authority` sends a `transaction` to the `program`
  - then that `program` can write to the `account`.

### Following the tutorial to view where the "Authority" and the bytecode is stored

Here are the pre-defined addresses at the time of deploying a program locally using Anchor.

**Base58 Addresses:**

- Solana Wallet Address (Authority): "Ga6VV426xwCaN1J7yT7qr4ysyLhhJ5w3agUGMTexrZwL"
- Solana Program Address: "2CP2vQejbXmYgTknYjsBiC3Tkz5rc6kDwRrqUcRiKPoN"
- Solana ProgramData Address: "Td763Uyr6rpyS2Sj7fk8MVsFC1amE83zYAW4KARoj45"

**Hex Addresses:**

- Solana Wallet Address (Authority): "e759aded0fb89d0320607a3b8ad40d39acb0aa4a0d0e18917a0065eb9d408687"
- Solana ProgramData Address hex: "06d1eccec4ca2207aaad32b24dd0b74358539fcfd99719a44b110ad10d6ff2ea"

> **NOTE:** To convert a `base58` address to `hex`, use the following code snippet:

```ts
import bs58 from "bs58";

const solanaAddress = "Ga6VV426xwCaN1J7yT7qr4ysyLhhJ5w3agUGMTexrZwL";
const solanaAddressBytes = bs58.decode(solanaAddress);
const solanaAddressHex = Buffer.from(solanaAddressBytes).toString("hex");
console.log(`Solana address hex: "${solanaAddressHex}"`);
```

To view the program:

- `solana account 2CP2vQejbXmYgTknYjsBiC3Tkz5rc6kDwRrqUcRiKPoN`

The `"ProgramData Address"` is stored as a `hex` value, starting with "06".

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

To return the `"Authority"` of the program:

- `solana program show 2CP2vQejbXmYgTknYjsBiC3Tkz5rc6kDwRrqUcRiKPoN`

The `"Authority"` of the program is equal to the `"Solana Wallet Address"`.

```
Program Id: 2CP2vQejbXmYgTknYjsBiC3Tkz5rc6kDwRrqUcRiKPoN
Owner: BPFLoaderUpgradeab1e11111111111111111111111
ProgramData Address: Td763Uyr6rpyS2Sj7fk8MVsFC1amE83zYAW4KARoj45
Authority: Ga6VV426xwCaN1J7yT7qr4ysyLhhJ5w3agUGMTexrZwL
Last Deployed In Slot: 22907
Data Length: 196528 (0x2ffb0) bytes
Balance: 1.36903896 SOL
```

To view the `"ProgramData Address"` data:

- `solana account Td763Uyr6rpyS2Sj7fk8MVsFC1amE83zYAW4KARoj45 > tempfile`
- `head -n 10 tempfile`

The `"Authority"` of the program is stored as a `hex`, starting with "e7".

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

## References

- [How Solana Program Deploy Works](https://solana.com/docs/programs/deploying#how-solana-program-deploy-works)
