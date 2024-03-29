# Day 9: Rust Structs and Attribute-like and Custom Derive Macros

[Day 9](https://www.rareskills.io/post/rust-attribute-derive-macro) of [RareSkills Solana Course](https://www.rareskills.io/solana-tutorial).

## Setup

1. Create a new Cargo package: `cargo new example --lib`
2. Go to Cargo package: `cd example`
3. Create `main.rs` file: `touch src/main.rs`
4. Run `main.rs`: `cargo run src/main.rs`

## Examples

There are two Cargo packages here that cover the two examples:

- [Example 1: attribute-like macro, inserting fields](example_1)
- [Example 2: an attribute-like macro, removing fields](example_2)

To test the examples, just go to the folder `cd example_x`, then run `cargo run src/main.rs`.

## Notes

- Rust `impl` are used to create `functions` that operate on a `struct`.
- Rust `Traits` enforces an `impl` to implement certain functions.
- An `attribute-like macro` takes in a `struct` and can completely rewrite it.
- A `derive macro` augments a struct with additional functions.
- `macros` allow Anchor to hide complexity.

## References

- [cargo new](https://doc.rust-lang.org/cargo/commands/cargo-new.html)
- [cargo run](https://doc.rust-lang.org/cargo/commands/cargo-run.html)
- [Rust Functions](https://doc.rust-lang.org/book/ch03-03-how-functions-work.html)
- [Rust `impl`](https://doc.rust-lang.org/std/keyword.impl.html)
- [Create solana_program](https://docs.rs/solana-program/latest/solana_program/)
- [Macro anchor_lang::program](https://docs.rs/anchor-lang/latest/anchor_lang/attr.program.html)
- [Derive Macro anchor_lang::Accounts](https://docs.rs/anchor-lang/latest/anchor_lang/derive.Accounts.html)
