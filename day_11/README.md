# Day 11: The Solana clock and other "block" variables

[Day 11](https://www.rareskills.io/post/solana-clock) of [RareSkills Solana Course](https://www.rareskills.io/solana-tutorial).

## Setup

1. Configure Solana to run on localhost: `solana config set --url localhost`
2. Run the test validator node on another terminal: `solana-test-validator`
3. Run Solana logs on another terminal: `solana logs`
4. Build Anchor program: `anchor build`
5. Sync program_id with Anchor key: `anchor keys sync`
6. Run tests: `anchor test --skip-local-validator`

## Notes

### `block.timestamp` in Solana

- `chrono` crate provides functionality for operations on `dates` and `times` in Rust.

```rust
use chrono::*;

let clock = Clock::get()?;
let time_stamp = clock.unix_timestamp; // current timestamp

let date_time = chrono::NaiveDateTime::from_timestamp_opt(time_stamp, 0).unwrap();
let day_of_the_week = date_time.weekday();
```

### `block.coinbase` in Solana

- In Ethereum, `block.coinbase` represents the address of the miner who has successfully mined a block in `Proof of Work (PoW)`.
- Solana uses a `leader-based` consensus mechanism, which is a combination of both `Proof of History (PoH)` and `Proof of Stake (PoS)`, removing the concept of `mining`.
- There is currently no way to access the address of the block leader in Solana programs.

### `block.gaslimit`

- Solana has a per-block compute unit limit of `48 million`.
- Each transaction is limited to `200,000 compute units` by default.
- Solana transactions' compute limit can be increased to `1.4 million compute units`.

### `block.basefee`

- The `basefee` in Ethereum is dynamic as of `EIP-1559`.
- The base price of a transaction in Solana is static, so there's need for a variable similar to `block.basefee`.

### `block.difficulty`

- Solana operates on a `Proof of History (PoH)` combined with `Proof of Stake (PoS)` consensus mechanism, which doesn't involve the concept of `block difficulty`.

### `block.chainid`

- `block.chainid` is how Solidity smart contracts know if they are on a testnet, L2, mainnet, or other EVM-compatible chains.
- Solana is not an `EVM-compatible` blockchain.
- Solana runs separate clusters for:
  - `devnet`
  - `testnet`
  - `mainnet`

## References

- [Rust chrono](https://docs.rs/chrono/latest/chrono/)
