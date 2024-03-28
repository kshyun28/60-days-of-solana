# Day 28: Multicall in Solana: Batching Transactions and Transaction Size Limit

[Day 28](https://www.rareskills.io/post/solana-multiple-transactions) of [RareSkills Solana Course](https://www.rareskills.io/solana-tutorial).

## Setup

1. Configure Solana to run on localhost: `solana config set --url localhost`
2. Run the test validator node on another terminal: `solana-test-validator --reset`
3. Run Solana logs on another terminal: `solana logs`
4. Build Anchor program: `anchor build`
5. Sync program_id with Anchor key: `anchor keys sync`
6. Run tests: `anchor test --skip-local-validator`

## Notes

- Solana has `multicall` support build into the runtime.
- When passing a `u32` value or smaller to Rust, we don't need to use a JavaScript `BigNumber`.
- A Solana transaction size cannot exceed `1232 bytes`.
  - You cannot batch an unlimited number of transactions.
- When one or more transactions in a batched transaction fails, the entire batched transaction will revert.
- When Anchor deploys a Solana program, the `bytecode` is split into multiple transactions since the entire bytecode won't fit in a single transaction.

## References

- [What is the maximum size of a Solana transaction?](https://solana.stackexchange.com/questions/9754/what-is-the-maximum-size-of-a-solana-transaction)
- [How Solana Program Deploy Works](https://solana.com/docs/programs/deploying#how-solana-program-deploy-works)
