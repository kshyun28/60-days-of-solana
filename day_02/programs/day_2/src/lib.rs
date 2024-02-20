use anchor_lang::prelude::*;

declare_id!("rioS6j2HUmbBMahMMLHyMBdVDU5KoqybP4DH7ouwBY2");

#[program]
pub mod day_2 {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>,
                      a: u64,
                      b: u64,
                      message: String) -> Result<()> {
        msg!("You said {:?}", message);
        msg!("You send {} and {}", a, b);
        Ok(())
    }

    pub fn array(_ctx: Context<Initialize>,
                 arr: Vec<u64>) -> Result<()> {
        msg!("Your array {:?}", arr);
        Ok(())
    }

    pub fn add(_ctx: Context<Initialize>,
               y: u64,
               z: u64) -> Result<()> {
        let x: u64 = y.checked_add(z).unwrap();
        msg!("Add {:?}", x);
        Ok(())
    }

    pub fn sub(_ctx: Context<Initialize>,
               y: u64,
               z: u64) -> Result<()> {
        let x: u64 = y.checked_sub(z).unwrap();
        msg!("Subtract {:?}", x);
        Ok(())
    }

    pub fn mul(_ctx: Context<Initialize>,
               y: u64,
               z: u64) -> Result<()> {
        let x: u64 = y.checked_mul(z).unwrap();
        msg!("Multiply {:?}", x);
        Ok(())
    }

    pub fn div(_ctx: Context<Initialize>,
               y: u64,
               z: u64) -> Result<()> {
        let x: u64 = y.checked_div(z).unwrap();
        msg!("Divide {:?}", x);
        Ok(())
    }

    pub fn sqrt(_ctx: Context<Initialize>,
                y: f32) -> Result<()> {
        let x: f32 = y.sqrt();
        msg!("Square root {:?}", x);
        Ok(())
    }

    pub fn log10(_ctx: Context<Initialize>,
                y: f32) -> Result<()> {
        let x: f32 = y.log10();
        msg!("log10 {:?}", x);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
