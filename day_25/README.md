# Day 25: PDA (Program Derived Address) vs Keypair Account in Solana

[Day 25](https://www.rareskills.io/post/solana-pda) of [RareSkills Solana Course](https://www.rareskills.io/solana-tutorial).

## Setup

1. Configure Solana to run on localhost: `solana config set --url localhost`
2. Run the test validator node on another terminal: `solana-test-validator --reset`
3. Run Solana logs on another terminal: `solana logs`
4. Build Anchor program: `anchor build`
5. Sync program_id with Anchor key: `anchor keys sync`
6. Run tests: `anchor test --skip-local-validator`

## Notes

### Program Derived Address (PDA)

- A `program derived address (PDA)` is an account whose address is derived from the address of the program that created it and the `seeds` passed to the `init` transaction.
- An account is a `PDA` if the address of the account is derived from the address of the program (`programId` in `findProgramAddressSync(seeds, program.programId)`).
- We know an account is a `PDA` because the `seeds` and `bump` are present in the `init` macro.

### Keypair Account

- When the `seed` and `bump` are not present in the `init` macro, we need to create an account, then pass the account to the program.
- It is not possible to initialize a keypair account you don't hold the private key for.

### PDAs or Keypair Accounts

- `PDAs` can only be initialized with a size of `10,240 bytes`, while `keypair accounts` can be initialized to the full size of `10 MB`.
- `PDAs` can be resized up to the `10 MB` limit.
- `PDAs` can be programatically addressed with the `seeds` parameter, while `keypair accounts` need to know the address in advance.
- `PDAs` are the preferred way to store data.

## References

- [Program Derived Addresses (PDAs)](https://www.anchor-lang.com/docs/pdas)
- [Solaba web3.js Keypair](https://solana-labs.github.io/solana-web3.js/classes/Keypair.html)
