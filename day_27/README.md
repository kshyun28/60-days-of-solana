# Day 27: Init_if_needed in Anchor and the Reinitialization Attack

[Day 27](https://www.rareskills.io/post/init-if-needed-anchor) of [RareSkills Solana Course](https://www.rareskills.io/solana-tutorial).

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

- `init_if_needed` can be used to initialize the account if it doesn't exist yet.
  - this feature needs to be enabled in `Cargo.toml`
  - `anchor-lang = { version = "0.29.0", features = ["init-if-needed"] }`
- Accounts in Anchor programs cannot be initialized twice by default.
  - initializing an account that has already been initialized will result in a `custom program error: 0x0` error.
- In Anchor, an account is not yet initialized if:
  - the account has a `lamport balance of zero` OR
  - the account is owned by the `system program`
- At the same time, an account in Anchor is initialized already if:
  - the account has a `non-zero lamport balance` OR
  - the account is owned by the `program`
- Solana accounts that haven't been initialized do not hold `zero-value variables`.
  - The variables `do not exist` and `cannot be read`.
- Erasing the `account discriminator` doesn't make an account `reinitializeable`.

## References

- [Anchor Accounts](https://docs.rs/anchor-lang/latest/anchor_lang/derive.Accounts.html)
- [Anchor Discriminator](https://book.anchor-lang.com/anchor_bts/discriminator.html)
- [System Program](https://docs.rs/anchor-lang/latest/anchor_lang/system_program/index.html)
