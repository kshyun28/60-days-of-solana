# 60-days-of-solana

My attempt at learning [Solana](https://solana.com/) [program (smart contract)](https://solana.com/docs/core/programs) development through [RareSkill's Solana course](https://www.rareskills.io/solana-tutorial).

## Directory

- [Day 1: Hello World (and troubleshooting Solana installation)](day_1/README.md)
- [Day 2: Function arguments, math, and arithmetic overflow](day_2/README.md)
- [Day 3: Anchor function magic and the Interface Definition Language](day_3/README.md)
- [Day 4: Solana reverts, errors, and basic access control](day_4/README.md)

## Setup

For initial setup of dependencies required for Solana program development, follow the [day 1 tutorial](day_1/README.md).

Then for creating a new Anchor project:

1. Initialize a project: `anchor init day_x`
2. Go to folder: `cd day_x`
3. Remove git repository: `rm -rf .git` (since `60-days-of-solana` is the main git repository)
4. Follow the tutorial for each day

## References

- [RareSkill's Solana course](https://www.rareskills.io/solana-tutorial)
- [Solana](https://solana.com/)
- [What are Solana Programs?](https://solana.com/docs/core/programs)
- [Anchor](https://www.anchor-lang.com/)
