# Day 30: Deleting and Closing Accounts and Programs in Solana

[Day 30](https://www.rareskills.io/post/solana-close-account) of [RareSkills Solana Course](https://www.rareskills.io/solana-tutorial).

## Setup

1. Configure Solana to run on localhost: `solana config set --url localhost`
2. Run the test validator node on another terminal: `solana-test-validator --reset`
3. Run Solana logs on another terminal: `solana logs`
4. Build Anchor program: `anchor build`
5. Sync program_id with Anchor key: `anchor keys sync`
6. Run tests: `anchor test --skip-local-validator`

## Notes

- `close` is the opposite of `init`.
- `close` does the following:
  - reduces the lamport balance to `zero`
  - sends the lamports to a `target addresses`
  - changes the owner of the account to the `system program`
- `close = signer` specifies that the signer will receive the `rent lamports` after closing the account.
- You can specify any address to receive the `rent lamports` from closing the account.
- Closed accounts can be initialized again.
- To close a Solana program, use `solana program close <address> --bypass-warning`
- A closed program cannot be redeployed again.

## References

- [Anchor Close](https://github.com/solana-developers/anchor-examples/tree/main/account-constraints/close)
- [Solana Labs Docs: Closing program and buffer accounts, and reclaiming their lamports](https://docs.solanalabs.com/cli/examples/deploy-a-program#closing-program-and-buffer-accounts-and-reclaiming-their-lamports)
