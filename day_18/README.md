# Day 18: Read account data with Solana web3.js and Anchor

[Day 18](https://www.rareskills.io/post/solana-read-account-data) of [RareSkills Solana Course](https://www.rareskills.io/solana-tutorial).

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

- To read the storage of a Solana program build with Anchor, you need to have:
  - a `program address`
  - and its `IDL`
- Solana doesn't enforce how you serialize data in accounts.

## References

- [Solana getAccountInfo RPC Method](https://solana.com/docs/rpc/http/getaccountinfo)
- [Solana Cookbook: Serializing Data](https://solanacookbook.com/guides/serialization.html#setting-up-for-borsh-serialization)
