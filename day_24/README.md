# Day 24: Modifying accounts using different signers

[Day 24](https://www.rareskills.io/post/anchor-signer) of [RareSkills Solana Course](https://www.rareskills.io/solana-tutorial).

## Setup

1. Configure Solana to run on localhost: `solana config set --url localhost`
2. Run the test validator node on another terminal: `solana-test-validator --reset`
3. Run Solana logs on another terminal: `solana logs`
4. Build Anchor program: `anchor build`
5. Sync program_id with Anchor key: `anchor keys sync`
6. Run tests: `anchor test --skip-local-validator`

## Notes

### Signers

- Anchor will look at the signature of the transaction and make sure the signature matches the address passed in the `Signer` type.
- `Unknown Signer` error occurs when the signer of the transaction does not match the public key passed to `Signer`.
  - when you remove `.signers([...])`, Anchor will use the default signer.
  - when you don't pass a `public key`, Anchor will use the default signer.
- An `authority` indicates the account that can make privileged changes to an account.
- `Authority` is similar to `onlyOwner` in Solidity, but is only applied to a single account.

### Constraints

- `Anchor constraints` can be used as an alternative to `require!` macro.
- `has_one` constraint checks that both keys in `#[derive(Accounts)]` and `#[account]` have the same value.
- `constraint` allows arbitrary constraints on accounts passed to the transactions and data in the account.
- `Custom errors` can be added to `constraints` with the `@` keyword.

## Troubleshooting

- [custom program error: 0x0](https://solana.stackexchange.com/questions/4385/stuck-at-error-failed-to-send-transaction-transaction-simulation-failed-error)
  > This happens when an account is already initialized.
- [custom program error: 0x1](https://solana.stackexchange.com/questions/1282/transaction-simulation-failed-failed-to-send-transaction-transaction-simulatio)
  > This happens when the account does not have enough SOL to execute the transaction.
- [Fallback functions are not supported](https://stackoverflow.com/questions/72228482/anchorerror-occurred-error-code-instructionfallbacknotfound-error-number-101)
  > I encountered this error when I tried to name a function `initialize_2`. It should instead be named `initialize2` so it can be properly referenced.

## References

- [Signer struct](https://docs.rs/anchor-lang/latest/anchor_lang/accounts/signer/struct.Signer.html)
- [Anchor constraints](https://www.anchor-lang.com/docs/account-constraints)
- [Anchor errors](https://www.anchor-lang.com/docs/errors)
