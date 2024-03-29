# Day 13: Solana logs, “events,” and transaction history

[Day 13](https://www.rareskills.io/post/solana-logs-transaction-history) of [RareSkills Solana Course](https://www.rareskills.io/solana-tutorial).

## Setup

1. Configure Solana to run on localhost: `solana config set --url localhost`
2. Run the test validator node on another terminal: `solana-test-validator`
3. Run Solana logs on another terminal: `solana logs`
4. Build Anchor program: `anchor build`
5. Sync program_id with Anchor key: `anchor keys sync`
6. Run tests: `anchor test --skip-local-validator`

## Notes

### Solana Events

- Events can be emitted using the `emit!` macro.
- Events are included in the Solana program's `IDL`.
- There are no indexed information in Solana (`index` field in the IDL does nothing).
- Events in Solana cannot be queried.
- Events in Solana can only be listened to as they occur.
- Events are preserved in the Solana block explorer.
- Logs are run by calling the system call [`sol_log_data`](https://docs.rs/solana-program/latest/src/solana_program/log.rs.html#116-124), which takes an argument of a `sequence of bytes`.

### Solana Transactions

- All transactions done by an address can be queried with [getSignaturesForAddress](https://solana.com/docs/rpc/http/getsignaturesforaddress) RPC function.
- Transaction content can be retrieved using [getParsedTransaction](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getParsedTransaction) RPC method.

## References

- [Macro anchor_lang::emit](https://docs.rs/anchor-lang/latest/anchor_lang/macro.emit.html)
- [anchor_lang::Event](https://docs.rs/anchor-lang/latest/anchor_lang/trait.Event.html)
