use anchor_lang::prelude::*;

declare_id!("CVjaQEELRcQuUyayj5vbfNeYLx8CzipneabsgCVGsRJ1");

#[program]
pub mod day_15 {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        // this costs 600 CU (type defaults to Vec<i32>)
        let mut a = Vec::new();
        a.push(1);
        a.push(1);
        a.push(1);
        a.push(1);
        a.push(1);
        a.push(1);

        // this costs 618 CU
        let mut a: Vec<u64> = Vec::new();
        a.push(1);
        a.push(1);
        a.push(1);
        a.push(1);
        a.push(1);
        a.push(1);

        // this costs 600 CU (same as the first one but the type was explicitly denoted)
        let mut a: Vec<i32> = Vec::new();
        a.push(1);
        a.push(1);
        a.push(1);
        a.push(1);
        a.push(1);
        a.push(1);

        // this costs 618 CU (takes the same space as u64)
        let mut a: Vec<i64> = Vec::new();
        a.push(1);
        a.push(1);
        a.push(1);
        a.push(1);
        a.push(1);
        a.push(1);

        // this costs 459 CU
        let mut a: Vec<u8> = Vec::new();
        a.push(1);
        a.push(1);
        a.push(1);
        a.push(1);
        a.push(1);
        a.push(1);
  
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
