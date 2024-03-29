# Day 5: Solana programs are upgradeable and do not have constructors

[Day 5](https://www.rareskills.io/post/solana-anchor-deploy) of [RareSkills Solana Course](https://www.rareskills.io/solana-tutorial).

## Setup

1. Configure Solana to run on localhost: `solana config set --url localhost`
2. Run the test validator node on another terminal: `solana-test-validator`
3. Run Solana logs on another terminal: `solana logs`
4. Build Anchor program: `anchor build`
5. Deploy Anchor program: `anchor deploy`
6. Sync program_id with Anchor key: `anchor keys sync`
7. Run tests: `anchor test --skip-local-validator --skip-deploy`

## Notes

- Solana programs don't have `constructors`.
- Solana programs are `mutable (upgradeable)` by default.
  - Solana doesn't need `delegatecall`, since programs can be upgraded.
- Solana programs don't have `immutable variables`.
  
## References

- [anchor deploy](https://www.anchor-lang.com/docs/cli#deploy)
- [Solana deploy "account data too small for instruction"](https://stackoverflow.com/questions/71267943/solana-deploy-account-data-too-small-for-instruction)
