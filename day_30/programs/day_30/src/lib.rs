use anchor_lang::prelude::*;
use std::mem::size_of;

declare_id!("3XymXN3tc11oMRpb7piYdGB7E8PdM9c3WhuNTfSvPKE8");

#[program]
pub mod day_30 {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }

    pub fn delete(_ctx: Context<Delete>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = signer, space = size_of::<ThePda>() + 8, seeds = [], bump)]
    pub the_pda: Account<'info, ThePda>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Delete<'info> {
    #[account(mut, close = signer, )]
    pub the_pda: Account<'info, ThePda>,

    #[account(mut)]
    pub signer: Signer<'info>,
}

#[account]
pub struct ThePda {
    pub x: u32,
}
