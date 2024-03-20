use anchor_lang::prelude::*;
use std::mem::size_of;
use anchor_lang::system_program;

declare_id!("5eqvDv1dD11zR4EEaxE6uK3NscwfTDR9nh5KbNLWX4Cm");

#[program]
pub mod day_27 {
    use super::*;

    pub fn increment(ctx: Context<Initialize>) -> Result<()> {
        let current_counter = ctx.accounts.my_pda.counter;
        ctx.accounts.my_pda.counter = current_counter + 1;
        Ok(())
    }

    pub fn initialize(ctx: Context<Reinitialize>) -> Result<()> {
        Ok(())
    }

    pub fn drain_lamports(ctx: Context<DrainLamports>) -> Result<()> {
        let lamports = ctx.accounts.your_pda.to_account_info().lamports();
        ctx.accounts.your_pda.sub_lamports(lamports)?;
				ctx.accounts.signer.add_lamports(lamports)?;
        Ok(())
    }

    pub fn give_to_system_program(ctx: Context<GiveToSystemProgram>) -> Result<()> {
        let account_info = &mut ctx.accounts.your_pda.to_account_info();
        // the assign method changes the owner
				account_info.assign(&system_program::ID);
        account_info.realloc(0, false)?;

        Ok(())
    }

    pub fn erase(ctx: Context<Erase>) -> Result<()> {
        ctx.accounts.your_pda.realloc(0, false)?;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init_if_needed,
        payer = signer,
        space = size_of::<MyPDA>() + 8,
        seeds = [],
        bump
    )]
    pub my_pda: Account<'info, MyPDA>,

    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct MyPDA {
    pub counter: u64,
}

#[derive(Accounts)]
pub struct DrainLamports<'info> {
    #[account(mut)]
    pub your_pda: Account<'info, YourPDA>,
    #[account(mut)]
    pub signer: Signer<'info>,
}

#[derive(Accounts)]
pub struct Erase<'info> {
    /// CHECK: We are going to erase the account
    #[account(mut)]
    pub your_pda: UncheckedAccount<'info>,
}

#[derive(Accounts)]
pub struct Reinitialize<'info> {
    #[account(init, payer = signer, space = 8, seeds = [], bump)]
    pub your_pda: Account<'info, YourPDA>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct GiveToSystemProgram<'info> {
    #[account(mut)]
    pub your_pda: Account<'info, YourPDA>,
}

#[account]
pub struct YourPDA {}
