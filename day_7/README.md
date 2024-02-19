# Day 7: The unusual syntax of Rust

[Day 7](https://www.rareskills.io/post/rust-weird-syntax) of [RareSkills Solana Course](https://www.rareskills.io/solana-tutorial).

## Setup

1. Configure Solana to run on localhost: `solana config set --url localhost`
2. Run the test validator node on another terminal: `solana-test-validator`
3. Run Solana logs on another terminal: `solana logs`
4. Build Anchor program: `anchor build`
5. Sync program_id with Anchor key: `anchor keys sync`
6. Run tests: `anchor test --skip-local-validator`

## References

- [Rust Copy types](https://dhghomon.github.io/easy_rust/Chapter_19.html)
- [Rust Ownership](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html)
- [Rust References and Borrowing](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html)
- [Rust Borrowing example](https://doc.rust-lang.org/rust-by-example/scope/borrow.html)
- [Rust Clone](https://doc.rust-lang.org/std/clone/trait.Clone.html)
- [Rust `mut`](https://doc.rust-lang.org/std/keyword.mut.html)
- [Rust generics](https://doc.rust-lang.org/book/ch10-01-syntax.html)
- [Rust Option](https://doc.rust-lang.org/std/option/enum.Option.html)
- [Rust Enum](https://doc.rust-lang.org/book/ch06-01-defining-an-enum.html)
- [Rust Deref](https://doc.rust-lang.org/std/ops/trait.Deref.html)
- [Rust `?`](https://web.mit.edu/rust-lang_v1.25/arch/amd64_ubuntu1404/share/doc/rust/html/reference/expressions/operator-expr.html#the-question-mark-operator)
