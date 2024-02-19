use anchor_lang::prelude::*;

declare_id!("JhsQRCko1kJ5NukLWx5owzuUvtZPaCRfWuHJFuyCvVg");

#[program]
pub mod day_3 {
    use super::*;

    pub fn boaty_mc_boatface(_ctx: Context<BoatyMcBoatface>,
                             _a: u64) -> Result<()> {
        Ok(())
    }

    pub fn add(_ctx: Context<BoatyMcBoatface>,
               a: u64,
               b: u64) -> Result<()> {
        let sum = a + b;
        msg!("Sum is {}", sum);
        Ok(())
    }

    pub fn sub(_ctx: Context<BoatyMcBoatface>,
               a: u64,
               b: u64) -> Result<()> {
        let difference = a - b;
        msg!("Difference is {}", difference);
        Ok(())
    }

    pub fn mul(_ctx: Context<BoatyMcBoatface>,
               a: u64,
               b: u64) -> Result<()> {
        let product = a * b;
        msg!("Product is {}", product);
        Ok(())
    }

    pub fn div(_ctx: Context<BoatyMcBoatface>,
               a: u64,
               b: u64) -> Result<()> {
        let quotient = a / b;
        msg!("Quotient is {}", quotient);
        Ok(())
    }

    pub fn modulo(_ctx: Context<BoatyMcBoatface>,
               a: u64,
               b: u64) -> Result<()> {
        let remainder = a % b;
        msg!("Remainder is {}", remainder);
        Ok(())
    }
}


#[derive(Accounts)]
pub struct BoatyMcBoatface {}
