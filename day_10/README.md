# Day 10: Visibility and "inheritance" in Rust and Solana

[Day 10](https://www.rareskills.io/post/rust-function-visibility) of [RareSkills Solana Course](https://www.rareskills.io/solana-tutorial).

## Setup

1. Configure Solana to run on localhost: `solana config set --url localhost`
2. Run the test validator node on another terminal: `solana-test-validator`
3. Run Solana logs on another terminal: `solana logs`
4. Build Anchor program: `anchor build`
5. Sync program_id with Anchor key: `anchor keys sync`
6. Run tests: `anchor test --skip-local-validator`

## Notes

### Public and External

- All Solana functions declared are `public` by default.
  - Adding a `pub` keyword to a function makes the function `public`.
- All functions in the `#[program]` block must be declared as public.
  - A Solana program won't compile if you remove the `pub` keyword on functions inside the `module (mod)` labeled `#[program]`.
- `public` functions in Solana can be considered as `external` in the context of Solidity.

### Internal

- These are functions accessible within the program itself and programs that inherit it.
- Functions inside a nested pub mod block are not included in the built program, but still, they can be accessed within or outside the parent module.
- Internal functions can be achieved by defining the function within the program module and making sure it is accessible within its own module and other modules where it is imported or used.

### Private

- These are functions that are not publicly accessible and cannot be invoked from outside their module.
- Achieving private visibility in Rust/Solana involves defining a function within a specific module with the pub(in crate::<module>) keyword, which makes the function visible within just the module it was defined in.
- defining a function within a specific module and ensuring they are not exposed outside that scope is a way to achieve private visibility.

### Contract Inheritance

- modules can be used to achieve similar functionality to Solidity's contract inheritance.
- modules don't have to be separate files.

## References

- [Rust Visibility and Privacy](https://doc.rust-lang.org/beta/reference/visibility-and-privacy.html)
- [Rust Visibility Example](https://doc.rust-lang.org/rust-by-example/mod/visibility.html)
