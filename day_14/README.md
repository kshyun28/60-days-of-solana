# Day 14: Tx.origin, msg.sender, and onlyOwner in Solana: identifying the caller

[Day 14](https://www.rareskills.io/post/msg-sender-solana) of [RareSkills Solana Course](https://www.rareskills.io/solana-tutorial).

## Setup

1. Configure Solana to run on localhost: `solana config set --url localhost`
2. Run the test validator node on another terminal: `solana-test-validator`
3. Run Solana logs on another terminal: `solana logs`
4. Build Anchor program: `anchor build`
5. Sync program_id with Anchor key: `anchor keys sync`
6. Run tests: `anchor test --skip-local-validator`

## Notes

- Solana transactions can have `multiple signers`.
- Anchor automatically passess the `wallet account` in the `provider` as a `signer`.
- The `#[access_control]` attribute executes the given access control method before running the main instruction.
- `#[access_control]` can be used to implement functionality similar to `onlyOwner`.

## References

- [Attribute Macro anchor_lang::access_control](https://docs.rs/anchor-lang/latest/anchor_lang/attr.access_control.html)
