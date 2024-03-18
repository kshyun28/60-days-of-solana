# Day 26: Understanding Account Ownership in Solana: Transferring SOL out of a PDA

[Day 26](https://www.rareskills.io/post/solana-account-owner) of [RareSkills Solana Course](https://www.rareskills.io/solana-tutorial).

## Setup

1. Configure Solana to run on localhost: `solana config set --url localhost`
2. Run the test validator node on another terminal: `solana-test-validator --reset`
3. Run Solana logs on another terminal: `solana logs`
4. Build Anchor program: `anchor build`
5. Sync program_id with Anchor key: `anchor keys sync`
6. Run tests: `anchor test --skip-local-validator`

> **Note:** The other tests are commented because the PDAs are not seeded (`findProgramAddressSync(seeds, program.programId)` uses the same seed `seeds=[]`).
>
> To run a specific test, do the following:
>
> 1. Redeploy the program:
>    - `rm -rf target/deploy`
>    - `anchor build`
>    - `anchor keys sync`
> 2. Uncomment the specific test (and comment out the other test cases)
> 3. Run the test: `anchor test --skip-local-validator`
>
> Reference for future improvement: [Reset state of ledger before each individual Anchor test](https://solana.stackexchange.com/questions/5581/how-can-i-reset-the-state-of-the-ledger-before-each-individual-anchor-test)

## Notes

### Account Ownership

- The owner of an account in Solana is able to:
  - reduce the SOL balance
  - write data to the account
  - change the owner

### System Program

- The `system program` owns wallets and keypair accounts that haven't been `initialized`.
  - An account is `initialized` when ownership is assigned to a program.
  - Although you "own" your wallet, you can't write data or reduce the lamport balance.
- When the `system program` recognizes that you have produced a valid signature for the public key, it will spend the lamports according to your instruction.
- Initializing an account changes the owner of the account from the `system program` to the `program`.
- To check the owner of an account in the Solana CLI, run `solana account <address>`.

### BPFLoaderUpgradeable

- The `BPFLoaderUpgradeable` owns programs.
- The wallet that deployed the program is not the owner.
- The `BPFLoaderUpgradeable` accepts new bytecode from the address that deployed the program, then writes new bytecode to the program.

### Transferring Account Ownership

- A program owns `Solana PDAs`. It can also own keypair accounts if ownership has been transferred to the program.
- After transferring the account, the data must be erased in the same transaction.
- Transferring account ownership doesn't permanently remove the account, it can be initialized again.

### Crowdfund Exercise

- Adding more lamports than you withdraw from would result in this error message:
  `failed to send transaction: Transaction simulation failed: Error processing Instruction 0: sum of account balances before and after instruction do not match`

## References

- [System Program](https://docs.rs/anchor-lang/latest/anchor_lang/system_program/index.html)
- [BPFLoaderUpgradeable](https://docs.rs/solana-program/latest/solana_program/bpf_loader_upgradeable/index.html)
