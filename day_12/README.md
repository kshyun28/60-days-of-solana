# Day 12: Beyond the block: sysvars

[Day 12](https://www.rareskills.io/post/solana-sysvar) of [RareSkills Solana Course](https://www.rareskills.io/solana-tutorial).

## Setup

1. Configure Solana to run on localhost: `solana config set --url localhost`
2. Run the test validator node on another terminal: `solana-test-validator`
3. Run Solana logs on another terminal: `solana logs`
4. Build Anchor program: `anchor build`
5. Sync program_id with Anchor key: `anchor keys sync`
6. Run tests: `anchor test --skip-local-validator`

## References

- [Solana sysvars](https://docs.solanalabs.com/runtime/sysvars)
- [anchor_lang::prelude::SolanaSysvar](https://docs.rs/anchor-lang/latest/anchor_lang/prelude/trait.SolanaSysvar.html)
- [Rust Lifetimes](https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html)
