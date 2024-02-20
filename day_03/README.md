# Day 3: Anchor function magic and the Interface Definition Language

[Day 3](https://www.rareskills.io/post/anchor-idl) of [RareSkills Solana Course](https://www.rareskills.io/solana-tutorial).

## Setup

1. Configure Solana to run on localhost: `solana config set --url localhost`
2. Run the test validator node on another terminal: `solana-test-validator`
3. Run Solana logs on another terminal: `solana logs`
4. Build Anchor program: `anchor build`
5. Sync program_id with Anchor key: `anchor keys sync`
6. Run tests: `anchor test --skip-local-validator`

> **Note:** `anchor build` only affects `lib.rs` file.
>
> To test the `IDL` output of `non-empty-account.rs`, replace the contents of `lib.rs` with the contents from `non-empty-account.rs`.

## References

- [derive.Accounts](https://docs.rs/anchor-lang/latest/anchor_lang/derive.Accounts.html)
- [Accounts Struct](https://www.anchor-lang.com/docs/the-accounts-struct)
