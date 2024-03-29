# Day 19: Creating “mappings” and “nested mapping” in Solana

[Day 19](https://www.rareskills.io/post/solana-solidity-mapping) of [RareSkills Solana Course](https://www.rareskills.io/solana-tutorial).

## Setup

1. Configure Solana to run on localhost: `solana config set --url localhost`
2. Run the test validator node on another terminal: `solana-test-validator --reset`
3. Run Solana logs on another terminal: `solana logs`
4. Build Anchor program: `anchor build`
5. Sync program_id with Anchor key: `anchor keys sync`
6. Run tests: `anchor test --skip-local-validator`

> Note: to retest the programs and avoid `failed to send transaction: Transaction simulation failed: Error processing Instruction 0: custom program error: 0x0` error, comment out the `initialize` function call.

```ts
// await program.methods.initialize().accounts(...).rpc();
```

## Notes

- `seeds=[]` in `init macro` behave as `keys` that can be used for mappings.
  - `keys` that are used by `init macro` need to be in an `instruction macro`.
- `seeds=[]` can have as many keys as the compute limit can support.
- `to_le_bytes()` means to `little endian` bytes.
- `to_be_bytes()` means to `big endian` bytes.

## References

- [What is Endianness? Big-Endian vs Little-Endian Explained with Examples](https://www.freecodecamp.org/news/what-is-endianness-big-endian-vs-little-endian/)
- [Macro anchor_lang::Accounts](https://docs.rs/anchor-lang/latest/anchor_lang/derive.Accounts.html)
- [Rust to_le_bytes](https://doc.rust-lang.org/std/index.html?search=to_le_bytes)
- [Rust to_be_bytes](https://doc.rust-lang.org/std/index.html?search=to_be_bytes)
