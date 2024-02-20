use anchor_lang::prelude::*;

declare_id!("63wc4dNUCWoYWYoyqHMDdGuwvE4Z5dBfDzEYmG3JsuSt");

#[program]
pub mod day_5 {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Updated message");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
