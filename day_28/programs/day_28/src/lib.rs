use anchor_lang::prelude::*;
use std::mem::size_of;

declare_id!("Hftf1K7Mf7zJDQcjwWzehQUAMMeUPSxCqqFCrpBVFUeB");

#[program]
pub mod day_28 {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }

    pub fn set(ctx: Context<Set>, new_val: u32) -> Result<()> {
        ctx.accounts.pda.value = new_val;
        Ok(())
    }

    pub fn set_always_fails(ctx: Context<Set>, new_val: u32) -> Result<()> {
        ctx.accounts.pda.value = new_val;
        return err!(Error::AlwaysFails);
    }
}

#[error_code]
pub enum Error {
    #[msg(always fails)]
    AlwaysFails,
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = signer, space = size_of::<PDA>() + 8, seeds = [], bump)]
    pub pda: Account<'info, PDA>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Set<'info> {
    #[account(mut)]
    pub pda: Account<'info, PDA>,
}

#[account]
pub struct PDA {
    pub value: u32,
}
