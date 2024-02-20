# Day 8: Understanding function-like macros in Rust

[Day 8](https://www.rareskills.io/post/rust-function-like-macro) of [RareSkills Solana Course](https://www.rareskills.io/solana-tutorial).

## Setup

1. Configure Solana to run on localhost: `solana config set --url localhost`
2. Run the test validator node on another terminal: `solana-test-validator`
3. Run Solana logs on another terminal: `solana logs`
4. Build Anchor program: `anchor build`
5. Sync program_id with Anchor key: `anchor keys sync`
6. Run tests: `anchor test --skip-local-validator`

## References

- [Rust std::io::stdout](https://doc.rust-lang.org/std/io/fn.stdout.html)
- [Macro solana_program::msg](https://docs.rs/solana-program/latest/solana_program/macro.msg.html)
- [Macro std::println](https://doc.rust-lang.org/std/macro.println.html)
