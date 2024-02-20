use anchor_lang::prelude::*;

// Import calculate module from `calculate.rs`
pub mod calculate;

declare_id!("HqUu2AjnQXnEbMJGoQHxaVNpyokRpNNcjw5wq526SDot");

#[program]
pub mod day_10 {
    use super::*;

    pub fn example1(_ctx: Context<Initialize>) -> Result<()> {
        let u = get_a_num();
        msg!("{}", u);
        Ok(())
    }

    pub fn example2(_ctx: Context<Initialize>) -> Result<()> {
        // Call the internal_function from within its parent module
        some_internal_function::internal_function();
        // Call the private_function from within its parent module
        some_private_function::private_function();

        Ok(())
    }

    pub mod some_internal_function {
        pub fn internal_function() {
            // Internal function logic...
        }
    }

    pub mod some_private_function {
        pub(in crate::day_10) fn private_function() {
            // Private function logic...
        }
    }

    pub fn add_two_numbers(_ctx: Context<Initialize>, x: u64, y: u64) -> Result<()> {
        // Call `add` function in calculate.rs
        let result1 = calculate::add(x, y);
        // Call `add` function in calculate_same_file module
        let result2 = calculate_same_file::add(x, y);

        msg!("{} + {} = {}", x, y, result1);
        msg!("{} + {} = {}", x, y, result2);
        Ok(())
    }

    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        // Call the private-like function
        let result2 = do_something::some_func_here();

        msg!("The result is {}", result2);

        Ok(())
    }
}

// non-public function for example_1
fn get_a_num() -> u64 {
  2
}

mod do_something {
    // Import day_10 module
    use crate::day_10;

    // This won't compile if you remove `pub` from the function signature
    pub fn some_func_here() -> u64 {
        // Call the internal_function from outside its parent module
        day_10::some_internal_function::internal_function();

        /* 
          Call the private_function from outside its parent module
          This will not build because the function is private
        */
        // day_10::some_private_function::private_function()

        // Do something else...
        return 20;
    }
}

mod calculate_same_file {
  pub fn add(x: u64, y: u64) -> u64 {
      // Return the summation of x and y
      x + y
  }
}

#[derive(Accounts)]
pub struct Initialize {}
