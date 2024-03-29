# Day 20: Cost of storage, maximum storage size, and account resizing in Solana

[Day 20](https://www.rareskills.io/post/solana-account-rent) of [RareSkills Solana Course](https://www.rareskills.io/solana-tutorial).

## Setup

1. Configure Solana to run on localhost: `solana config set --url localhost`
2. Run the test validator node on another terminal: `solana-test-validator --reset`
3. Run Solana logs on another terminal: `solana logs`
4. Build Anchor program: `anchor build`
5. Sync program_id with Anchor key: `anchor keys sync`
6. Run tests: `anchor test --skip-local-validator`

## Notes

### Rent

- When allocating storage space, the payer must pay a certain number of SOL per byte allocated, which is called `rent`.
- When `two years of rent are paid`, the account is considered `rent exempt`.
- To estimate rent, run `solana rent <number of bytes>`

### Anchor Rent Module

- `ACCOUNT_STORAGE_OVERHEAD`: this constant has a value of `128 (bytes)`.
- `DEFAULT_EXEMPTION_THRESHOLD`: this constant has a value of `2.0 (float 64)`.
- `DEFAULT_LAMPORTS_PER_BYTE_YEAR`: this constant has a value of `3,480`.

## Account Initialization and Size

- An account cannot be initialized with more than `10,240 bytes` in size.
- To increase the size of the account, use the `realloc` macro.
- Set `realloc::zero = false` to keep the account data.
- Set `realloc::zero = true` to reset the account data.
- The maximum account size increase per realloc is `10240`.
- The maximum account size is `10 MB`.

### Anticipating the cost of deploying a program

1. Run `anchor deploy`.
2. Get the `Program Id:`, then run `solana program show <program id>`
3. Get the `ProgramData Address:`, then run `solana account <ProgramData Address> > /tmp/solana_acc && cat /tmp/solana_acc | head -n 10`
4. The `Balance` should be the anticipated cost of deploying a Solana program.

## References

- [Solana Rent](https://solana.com/docs/core/rent)
- [Solana Rent Exempt](https://solana.com/docs/core/rent#rent-exempt)
- [Anchor Module solana_program::rent](https://docs.rs/solana-program/latest/solana_program/rent/index.html)
- [Anchor Macro Accounts](https://docs.rs/anchor-lang/latest/anchor_lang/derive.Accounts.html)
- [`anchor deploy`](https://www.anchor-lang.com/docs/cli#deploy)
