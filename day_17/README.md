# Day 17: Solana counter tutorial: reading and writing data to accounts

[Day 17](https://www.rareskills.io/post/solana-counter-program) of [RareSkills Solana Course](https://www.rareskills.io/solana-tutorial).

## Setup

1. Configure Solana to run on localhost: `solana config set --url localhost`
2. Run the test validator node on another terminal: `solana-test-validator --reset`
3. Run Solana logs on another terminal: `solana logs`
4. Build Anchor program: `anchor build`
5. Sync program_id with Anchor key: `anchor keys sync`
6. Run tests: `anchor test --skip-local-validator`

## Notes

- A `Solana transaction` must specify in advance which accounts it will access.
  - Account storage is accessible via `Context` (`ctx.accounts.my_storage.x`);
- Use `mut` (mutable) keyword for `writing` (or reading and writing) to storage.
- View storage account with Solana CLI: `solana account <address>`
  ```
  Length: 16 (0x10) bytes
  0000:   1c f2 3b 85  43 19 31 28  ac 00 00 00  00 00 00 00   ..;.C.1(........
  ```
  - `First 8 bytes` are the `discriminator`.
  - `ac` is hex representation of `172` (170 incremented twice in the test case).

## References

- [Macro anchor_lang::Accounts](https://docs.rs/anchor-lang/latest/anchor_lang/derive.Accounts.html)
- [Struct anchor_lang::context::Context](https://docs.rs/anchor-lang/latest/anchor_lang/context/struct.Context.html)
- [Anchor Discriminator](https://book.anchor-lang.com/anchor_bts/discriminator.html)
- [Solana CLI Reference and Usage](https://docs.solanalabs.com/cli/usage)
