# Day 15: Introduction to Solana Compute Units and Transaction Fees

[Day 15](https://www.rareskills.io/post/solana-compute-unit-price) of [RareSkills Solana Course](https://www.rareskills.io/solana-tutorial).

## Setup

1. Configure Solana to run on localhost: `solana config set --url localhost`
2. Run the test validator node on another terminal: `solana-test-validator`
3. Run Solana logs on another terminal: `solana logs`
4. Build Anchor program: `anchor build`
5. Sync program_id with Anchor key: `anchor keys sync`
6. Run tests: `anchor test --skip-local-validator`

## Notes

### Solana Compute Units (CU)

- Solana opcodes/instructions consume `compute units`.
- Each Solana transaction is soft-capped at `200,000 compute units`.
  - If the transaction costs `more than 200,000 compute units`, it `reverts`.
  - The limit can be increased up to `1,400,000 compute units` with an extra cost.
- Each Solana opcode costs `one compute unit`.
- Smaller integers save compute units.
  - `i32` would use less compute units than `i64`, vice versa.

### Solana Transaction Fees

- Compute units used in a transaction does not affect transaction fees.
- Currently, Solana transaction fees are determined by the `number of signatures that need to be verified` in a transaction.
  - Theoretically, [a single transaction could contain as many as 12 signatures](https://solana.com/docs/core/transactions/fees#transaction-fee-calculation).
- A Solana transaction with a single signature would cost `5000 lamports` or `0.000005 SOL`.

### extended Berkeley Packet Filter (eBPF)

- Solana programs written in `Rust` or `C` are compiled down to `eBPF` for the `Solana VM`.
- `eBPF` allows execution of arbitrary `eBPF bytecode` within the kernel (sandbox environment) when the kernel emits an event the eBPF bytecode subscribes to, like:
  - network: open/close a socket
  - disk: write/read
  - creation of a process
  - creation of a thread
  - cpu instruction invocation
  - supports up to 64 bits (that’s why solana has a max uint type of u64)
- The program is only executed when an event is emmited in the kernel.

### Solana Bytecode Format (SBF)

- `Solana Bytecode Format (SBF)` is a variant of `eBPF`.
- Solana Bytecode Format removed the `bytecode verifier`, which `eBPF` uses to ensure that all possible execution paths are finite and safe to execute.
- Solana Bytecode Format have safety checks in the runtime and limits computational resources spent with a `compute unit limit`.
- While looking for references, I've encountered this [pull request](https://github.com/solana-labs/solana/issues/30566) to "Rename Soalan Bytecode Format(SBF) toolchain" (lol).

## References

- [Berkeley Packet Filter (BPF)](https://en.wikipedia.org/wiki/Berkeley_Packet_Filter)
- [extended Berkeley Packet Filter (eBPF)](https://en.wikipedia.org/wiki/EBPF)
- [Solana rBPF](https://github.com/solana-labs/rbpf)
- [Overview of the Solana Runtime](https://solana.com/docs/core/runtime)
- [Solana Program Runtime Compute Budget](https://github.com/solana-labs/solana/blob/090e11210aa7222d8295610a6ccac4acda711bb9/program-runtime/src/compute_budget.rs#L26-L87)
