# Day 2: Arithmetic and Basic Types in Solana and Rust

[Day 2](https://www.rareskills.io/post/rust-arithmetic-operators) of [RareSkills Solana Course](https://www.rareskills.io/solana-tutorial).

## Setup

1. Configure Solana to run on localhost: `solana config set --url localhost`
2. Run the test validator node on another terminal: `solana-test-validator`
3. Run Solana logs on another terminal: `solana logs`
4. Build Anchor program: `anchor build`
5. Sync program_id with Anchor key: `anchor keys sync`
6. Run tests: `anchor test --skip-local-validator`

## Notes

### Solana Rust Arithmetic
- Solana Rust uses `u64` as the standard integer size.
- A `vector (Vec)` is Solana Rust's array.
- Solana has limited support for `floating point math` ([reference](https://solana.com/docs/programs/limitations#float-rust-types-support)).
- There are two ways to defend against `arithmetic overflow` in Solana:
  - by setting `overflow-checks=true` in the `Cargo.toml` file.
    - adding overflow checks increase the compute cost of the transaction.
  - by using `checked_*` operator.
    - `x.checked_add(y).unwrap()`
    - `x.checked_sub(y).unwrap()`
    - `x.checked_mul(y).unwrap()`
    - `x.checked_div(y).unwrap()`
- For getting the `power of y` of a number, the syntax is `x.pow(y)`.
- For getting the `square root` of a number, the syntax is `x.sqrt()`.
- For getting the `cube root` of a number, the syntax is `x.cbrt()`.
- For getting the `logarithm base 10` of a number, the syntax is `x.log10()`.

### Compute Units
- In Solana, `gas` is called a `compute unit`.
- A Solana transaction is limited to `200,000 compute units` by default.

## References

- [Rust Primitive Type `u64`](https://doc.rust-lang.org/std/primitive.u64.html)
- [Rust Primitive Type `f32`](https://doc.rust-lang.org/std/primitive.f32.html)
- [`u64` checked_add](https://doc.rust-lang.org/std/primitive.u64.html#method.checked_add)
- [`u64` checked_sub](https://doc.rust-lang.org/std/primitive.u64.html#method.checked_sub)
- [`u64` checked_mul](https://doc.rust-lang.org/std/primitive.u64.html#method.checked_mul)
- [`u64` checked_div](https://doc.rust-lang.org/std/primitive.u64.html#method.checked_div)
- [`f32` sqrt](https://doc.rust-lang.org/std/primitive.f32.html#method.sqrt)
- [`f32` log10](https://doc.rust-lang.org/std/primitive.f32.html#method.log10)
