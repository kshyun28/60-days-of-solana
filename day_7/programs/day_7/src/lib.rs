use anchor_lang::prelude::*;

declare_id!("FchWKw5D3eiCpV4F6udpumCoWExuM2KCe8CP5g5h3KFG");

// Import the `BorshSerialize` and `BorshDeserialize` traits to allow encoding and decoding of the `Person` struct
use borsh::{BorshSerialize, BorshDeserialize};

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct Person {
    name: String,
    age: u8,
}

#[program]
pub mod day_7 {
    use super::*;

    pub fn borrowing(_ctx: Context<Initialize>) -> Result<()> {
        let s1 = String::from("abc");
        
        let s2 = &s1; // s2 can now view `String::from("abc")` but not own it
        
        msg!("{}", s1); // This compiles, s1 still holds its original string value.
        msg!("{}", s2); // This compiles, s2 holds a reference to the string value in s1.
        Ok(())
    }

    pub fn cloning(_ctx: Context<Initialize>) -> Result<()> {
        let mut message = String::from("hello");
        msg!("{:?}", message);

        let mut y = message.clone();
        message = message + " world";

        msg!("{:?}", message);
        msg!("{:?}", y);
        Ok(())
    }

    pub fn mut_keyword(_ctx: Context<Initialize>) -> Result<()> {
        let mut counter = 0;
        counter = counter + 1;

        msg!("{}", counter);
        Ok(())
    }

    pub fn generics(_ctx: Context<Initialize>) -> Result<()> {
        #[derive(Debug)]
        struct MyValues<T> {
            foo: T,
        }

        let first_struct: MyValues<i32> = MyValues { foo: 1 }; // foo has type i32
        let second_struct: MyValues<bool> = MyValues { foo: false }; // foo has type bool
        
        msg!("{:?}", first_struct);
        msg!("{:?}", second_struct);
        Ok(())
    }

    pub fn options_enums_deref(_ctx: Context<Initialize>) -> Result<()> {
        let v = Vec::from([1,2,3,4,5]);

        assert!(*v.iter().max().unwrap() == 5);
        Ok(())
    }

    pub fn encode_and_decode(_ctx: Context<Initialize>) -> Result<()> {
        // Create a new instance of the `Person` struct
        let init_person: Person = Person {
            name: "Alice".to_string(),
            age: 27,
        };
    
        // Encode the `init_person` struct into a byte vector
        let encoded_data: Vec<u8> = init_person.try_to_vec().unwrap();
    
        // Decode the encoded data back into a `Person` struct
        let data: Person = decode(_ctx, encoded_data)?;
    
        // Logs the decoded person's name and age
        msg!("My name is {:?}, I am {:?} years old.", data.name, data.age);
    
        Ok(())
    }
    
    pub fn decode(_accounts: Context<Initialize>, encoded_data: Vec<u8>) -> Result<Person> {
        // Decode the encoded data back into a `Person` struct
        let decoded_data: Person = Person::try_from_slice(&encoded_data).unwrap();
    
        Ok(decoded_data)
    }
}

#[derive(Accounts)]
pub struct Initialize {}
