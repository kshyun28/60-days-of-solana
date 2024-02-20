# 60-days-of-solana

My attempt at learning [Solana](https://solana.com/) [program (smart contract)](https://solana.com/docs/core/programs) development through [RareSkill's Solana course](https://www.rareskills.io/solana-tutorial).

> Originally, I was trying to create a single anchor project and add the daily exercises under `programs` (`programs/day_1`, `programs/day_2`, `programs/day_x`), but this made following along with the tutorial harder (longer running tests, Anchor not supporting deployment/testing of individual programs out of the box).

## Directory

- [Day 1: Hello World (and troubleshooting Solana installation)](day_1/README.md)
- [Day 2: Function arguments, math, and arithmetic overflow](day_2/README.md)
- [Day 3: Anchor function magic and the Interface Definition Language](day_3/README.md)
- [Day 4: Solana reverts, errors, and basic access control](day_4/README.md)
- [Day 5: Where is the constructor? About anchor deploy](day_5/README.md)
- [Day 6: Solidity Translations to Rust and Solana](day_6/README.md)
- [Day 7: The unusual syntax of Rust](day_7/README.md)
- [Day 8: Understanding function-like macros in Rust](day_8/README.md)
- [Day 9: Rust Structs and Attribute-like and Custom Derive Macros](day_9/README.md)
- [Day 10: Translating Solidity function visibility and contract inheritance to Solana](day_10/README.md)

## Setup

For the initial setup of dependencies required for Solana program development, follow the [day 1 tutorial](day_1/README.md).

Then for creating a new Anchor project:

1. Initialize a project: `anchor init day_x`
2. Go to folder: `cd day_x`
3. Remove git repository: `rm -rf .git` (since `60-days-of-solana` is the main git repository)
4. Follow the tutorial for each day

## Troubleshooting

Here is a list of common issues that I've encountered while going through the tutorials and how to resolve them.

- `Error: Deploying program failed: RPC response error -32002: Transaction simulation failed: Error processing Instruction 0: account data too small for instruction`

  - [StackOverflow](https://stackoverflow.com/questions/71267943/solana-deploy-account-data-too-small-for-instruction)

  To resolve this:

  1.  Delete `day_x/target/deploy`
  2.  Build Anchor program: `anchor build`
  3.  Sync keys: `anchor keys sync`
  4.  Redeploy or retest: `anchor deploy` or `anchor test`

## References

- [RareSkill's Solana course](https://www.rareskills.io/solana-tutorial)
- [Solana](https://solana.com/)
- [What are Solana Programs?](https://solana.com/docs/core/programs)
- [Anchor](https://www.anchor-lang.com/)
