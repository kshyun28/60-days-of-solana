use anchor_lang::prelude::*;
use std::mem::size_of; 

declare_id!("F1u71f74aBdLTixkgkTDUVC3Z8ySN8sc8cGERQ2T6DJV");

#[program]
pub mod day_25 {
    use super::*;

    pub fn initialize_pda(_ctx: Context<InitializePDA>) -> Result<()> {
        Ok(())
    }

    pub fn initialize_keypair_account(_ctx: Context<InitializeKeypairAccount>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializePDA<'info> {

		// This is the program derived address
    #[account(init,
              payer = signer,
              space=size_of::<MyPDA>() + 8,
              seeds = [],
              bump)]
    pub my_pda: Account<'info, MyPDA>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[account]
pub struct MyPDA {
    x: u64,
}

#[derive(Accounts)]
pub struct InitializeKeypairAccount<'info> {
		// This is the program derived address
    #[account(init,
              payer = signer,
              space = size_of::<MyKeypairAccount>() + 8,)]
    pub my_keypair_account: Account<'info, MyKeypairAccount>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[account]
pub struct MyKeypairAccount {
    x: u64,
}