use anchor_lang::prelude::*;

declare_id!("9r2GnRvHZz8Sgutcvxht2ZZtJnf12YQdFtLPhyjttKry");

#[program]
pub mod day_4 {
    use super::*;

    pub fn limit_range(ctxThen : Context<LimitRange>, a: u64) -> Result<()> {
        require!(a >= 10, MyError::AisTooSmall);
        require!(a <= 100, MyError::AisTooBig);
        msg!("Result = {}", a);
        Ok(())
    }

    pub fn func(ctx: Context<LimitRange>) -> Result<()> {
        msg!("Will this print?");
        // return err!(MyError::AlwaysErrors);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct LimitRange {}

#[error_code]
pub enum MyError {
    #[msg("a is too small")]
    AisTooSmall,
    #[msg("a is too big")]
    AisTooBig,
    #[msg("Always errors")]  // NEW ERROR, what do you think the error code will be?
    AlwaysErrors,
}