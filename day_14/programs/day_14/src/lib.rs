use anchor_lang::prelude::*;

declare_id!("H6WZr6wR3XoToy6AXTSUcm6bujHR5bsPoKRbnQg5s5D2");

const OWNER: &str = "Ga6VV426xwCaN1J7yT7qr4ysyLhhJ5w3agUGMTexrZwL";

#[program]
pub mod day_14 {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let the_signer1: &mut Signer = &mut ctx.accounts.signer1;

        // Function logic....

        msg!("The signer1: {:?}", *the_signer1.key);

        Ok(())
    }

    pub fn two_signers(ctx: Context<Initialize>) -> Result<()> {
        let the_signer1: &mut Signer = &mut ctx.accounts.signer1;
        let the_signer2: &mut Signer = &mut ctx.accounts.signer2;

        // Function logic....

        msg!("The signer1: {:?}", *the_signer1.key);
        msg!("The signer2: {:?}", *the_signer2.key);

        Ok(())
    }

    pub fn three_signers(ctx: Context<Initialize>) -> Result<()> {
        let the_signer1: &mut Signer = &mut ctx.accounts.signer1;
        let the_signer2: &mut Signer = &mut ctx.accounts.signer2;
        let the_signer3: &mut Signer = &mut ctx.accounts.signer3;

        // Function logic....

        msg!("The signer1: {:?}", *the_signer1.key);
        msg!("The signer2: {:?}", *the_signer2.key);
        msg!("The signer3: {:?}", *the_signer3.key);

        Ok(())
    }

    #[access_control(check(&ctx))]
    pub fn only_owner(ctx: Context<OnlyOwner>) -> Result<()> {
        // Function logic....

        msg!("The owner: {:?}", *ctx.accounts.signer_account.key);
        Ok(())
    }
}

fn check(ctx: &Context<OnlyOwner>) -> Result<()> {
    // Check if signer === owner
    require_keys_eq!(
        ctx.accounts.signer_account.key(),
        OWNER.parse::<Pubkey>().unwrap(),
        OnlyOwnerError::NotOwner
    );

    Ok(())
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub signer1: Signer<'info>,
    pub signer2: Signer<'info>,
    pub signer3: Signer<'info>,
}

#[derive(Accounts)]
pub struct OnlyOwner<'info> {
  signer_account: Signer<'info>,
}

// An enum for custom error codes
#[error_code]
pub enum OnlyOwnerError {
    #[msg("Only owner can call this function!")]
    NotOwner,
}
