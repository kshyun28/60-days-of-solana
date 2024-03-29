# Day 22: Function modifiers (view, pure, payable) and fallback functions in Solana: why they don't exist

[Day 22](https://www.rareskills.io/post/solidity-function-types-solana) of [RareSkills Solana Course](https://www.rareskills.io/solana-tutorial).

## Notes

### Fallback and Receive

- Solana does not have `fallback` or `receive` functions (compared to Solidity).
- A Solana transaction needs to specify the accounts it will `modify` or `read` as part of the transaction.

### View and Pure

- Solana does not have the concept of `view` or `pure` functions.
- If an account is not included in the `Context struct` definition, that function won't access that account.

### staticcall

- There's no `staticcall` in the Solana virtual machine or runtime.

### Read Only Reentrancy

- It is not possible to use `reentrancy locks` to defent against [read only reentrancy](https://www.rareskills.io/post/where-to-find-solidity-reentrancy-attacks) in Solana.
- The program needs to expose a flag for readers to know if the data is reliable.

### Custom Modifiers

- Custom modifiers like `onlyOwner` or `nonReentrant` are not available in Rust.

### Custom Units

- Custom units are not available in `Rust` or `Anchor`.
- `LAMPORTS_PER_SOL` is available in the `Solana Web3.js` library.

### Payable

- Programs transfer `SOL` from the user.
- Users do not transfer `SOL` to the program.

## References

[Solidity Read Only Reentrancy](https://www.rareskills.io/post/where-to-find-solidity-reentrancy-attacks)
