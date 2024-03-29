# Day 23: Transferring SOL and building a payment splitter: "msg.value" in Solana

[Day 23](https://www.rareskills.io/post/anchor-transfer-sol) of [RareSkills Solana Course](https://www.rareskills.io/solana-tutorial).

## Setup

1. Configure Solana to run on localhost: `solana config set --url localhost`
2. Run the test validator node on another terminal: `solana-test-validator --reset`
3. Run Solana logs on another terminal: `solana logs`
4. Build Anchor program: `anchor build`
5. Sync program_id with Anchor key: `anchor keys sync`
6. Run tests: `anchor test --skip-local-validator`

## Notes

- There are no concepts of `payable` or `msg.value` in Solana.
- Ethereum wallets `pushes ETH` to the contract, while Solana programs `pull SOL` from the wallet.

### CPI: Cross Program Invocation

- The `system program` transfers SOL from one account to another.
- The `system program` has a `transfer(cpi_context, amount)` function.
- The `system program` needs a `Context` that can be built using `CpiContext`.
- The `SOL transfer amount` is not part of the `Context`.
- `is_ok()` can be used to check if the `cross program invocation` succeeded.
- Only the signer can be `from`.
  - The `system program` will reject the call if `from` is not a `Signer`.
- `ctx.remaining_accounts` accepts an arbitrary number of accounts without having to create multiple keys in the `Context struct`.

## References

- [Anchor Cross-Program Invocations](https://book.anchor-lang.com/anchor_in_depth/CPIs.html)
- [Anchor Program Module](https://book.anchor-lang.com/anchor_in_depth/the_program_module.html)
- [Anchor Context](https://docs.rs/anchor-lang/latest/anchor_lang/context/struct.Context.html)
- [Anchor CpiContext](https://docs.rs/anchor-lang/latest/anchor_lang/context/struct.CpiContext.html)
- [Anchor system_program](https://docs.rs/anchor-lang/latest/anchor_lang/system_program/index.html)
- [Anchor system_program::Transfer](https://docs.rs/anchor-lang/latest/anchor_lang/system_program/struct.Transfer.html)
- [Anchor is_ok()](https://docs.rs/anchor-lang/latest/anchor_lang/type.Result.html#method.is_ok)
