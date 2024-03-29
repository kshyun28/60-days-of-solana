# Day 12: Solana Sysvars Explained

[Day 12](https://www.rareskills.io/post/solana-sysvar) of [RareSkills Solana Course](https://www.rareskills.io/solana-tutorial).

## Setup

1. Configure Solana to run on localhost: `solana config set --url localhost`
2. Run the test validator node on another terminal: `solana-test-validator`
3. Run Solana logs on another terminal: `solana logs`
4. Build Anchor program: `anchor build`
5. Sync program_id with Anchor key: `anchor keys sync`
6. Run tests: `anchor test --skip-local-validator`

## Note

### Solana `sysvars`

- `sysvars` are `read-only system accounts` that give `Solana programs` access to the `blockchain state`, as well as `network information`.
- in `Anchor programs`, sysvars can be accessed in two ways:
  - using `Anchor's` get method wrapper.
  - treating it as an account in the `#[Derive(Accounts)]` using its public address.
- Here are a list of `sysvars`:
  - `Clock:` Used for time-related operations like getting the current time or slot number.
  - `EpochSchedule:` Contains information about epoch scheduling, including the epoch for a particular slot.
  - `Rent:` Contains the rental rate and information like the minimum balance requirements to keep an account rent exempt.
  - `Fees:` Contains the fee calculator for the current slot. The fee calculator provides information on how many lamports are paid per signature in a Solana transaction.
  - `EpochRewards:` The EpochRewards sysvar holds a record of epoch rewards distribution in Solana, including block rewards and staking rewards.
  - `RecentBlockhashes:` Contains the active recent block hashes.
  - `SlotHashes:` Contains history of recent slot hashes.
  - `SlotHistory:` Holds an array of slots available during the most recent epoch in Solana, and it is updated every time a new slot is processed.
  - `StakeHistory:` maintains a record of stake activations and deactivations for the entire network on a per-epoch basis, which is updated at the beginning of each epoch.
  - `Instructions:` To get access to the serialized instructions that are part of the current transaction.
  - `LastRestartSlot:` Contains the slot number of the last restart (the last time Solana restarted ) or zero if none ever happened. If the Solana blockchain were to crash and restart, an application can use this information to determine if it should wait until things stabilize.

### Solana `slots` and `blocks`

- A `slot` is a window of time (around `400 ms`) where a designated leader can produce a block.
- A `slot` might not contain a `block` if the block leader failed to produce a block during that slot.

## References

- [Solana sysvars](https://docs.solanalabs.com/runtime/sysvars)
- [anchor_lang::prelude::SolanaSysvar](https://docs.rs/anchor-lang/latest/anchor_lang/prelude/trait.SolanaSysvar.html)
- [Rust Lifetimes](https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html)
