use anchor_lang::prelude::*;
use std::io::Write;

declare_id!("6eRfdYvgRemdkt6FxskGYS1MUpiHFPLsMFitZDcUft3y");

#[program]
pub mod day_8 {
    use super::*;

    pub fn logs_function(_ctx: Context<Initialize>) -> Result<()> {
        std::io::stdout().write(b"Hello, world!\n").unwrap();
        Ok(())
    }

    pub fn logs_macro(_ctx: Context<Initialize>) -> Result<()> {
        msg!("{} {}", "Hello,", "world!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
