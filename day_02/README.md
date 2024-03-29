# Day 2: Function arguments, math, and arithmetic overflow

[Day 2](https://www.rareskills.io/post/rust-arithmetic-operators) of [RareSkills Solana Course](https://www.rareskills.io/solana-tutorial).

## Setup

1. Configure Solana to run on localhost: `solana config set --url localhost`
2. Run the test validator node on another terminal: `solana-test-validator`
3. Run Solana logs on another terminal: `solana logs`
4. Build Anchor program: `anchor build`
5. Sync program_id with Anchor key: `anchor keys sync`
6. Run tests: `anchor test --skip-local-validator`

## References

- [Rust Primitive Type `u64`](https://doc.rust-lang.org/std/primitive.u64.html)
- [Rust Primitive Type `f32`](https://doc.rust-lang.org/std/primitive.f32.html)
- [`u64` checked_add](https://doc.rust-lang.org/std/primitive.u64.html#method.checked_add)
- [`u64` checked_sub](https://doc.rust-lang.org/std/primitive.u64.html#method.checked_sub)
- [`u64` checked_mul](https://doc.rust-lang.org/std/primitive.u64.html#method.checked_mul)
- [`u64` checked_div](https://doc.rust-lang.org/std/primitive.u64.html#method.checked_div)
- [`f32` sqrt](https://doc.rust-lang.org/std/primitive.f32.html#method.sqrt)
- [`f32` log10](https://doc.rust-lang.org/std/primitive.f32.html#method.log10)
