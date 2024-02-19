use anchor_lang::prelude::*;

declare_id!("DGkXh39jGNM6PPycju4U44iSm547fUvbhRJ5AkGsJYxS");

#[program]
pub mod day_1 {
    use super::*;

    pub fn initialize2(_ctx: Context<Initialize>) -> Result<()> {
      msg!("Hello, world!");
      Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
