use anchor_lang::prelude::*;

declare_id!("gTWf7mcKqzi1eYwxqSYAH8JrEo9ytmjf3Crh9SNG2ok");

#[program]
pub mod read {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
