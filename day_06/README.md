# Day 6: Basic Rust for Solidity Developers

[Day 6](https://www.rareskills.io/post/rust-basic-syntax) of [RareSkills Solana Course](https://www.rareskills.io/solana-tutorial).

## Setup

1. Configure Solana to run on localhost: `solana config set --url localhost`
2. Run the test validator node on another terminal: `solana-test-validator`
3. Run Solana logs on another terminal: `solana logs`
4. Build Anchor program: `anchor build`
5. Sync program_id with Anchor key: `anchor keys sync`
6. Run tests: `anchor test --skip-local-validator`

## Notes

### Conditional Statements

- If-Else statements
```rust
if age >= 18 {
    msg!("You are 18 years old or above");
} else {
    msg!("You are below 18 years old");
}
```
> `parenthesis` are optional for if statements

- Ternary operator
```rust
a = age % 2 == 0 ? true : false;
```

- Match
```rust
match age {
    1 => {
        // Code block executed if age equals 1
        msg!("The age is 1");
    },
    2 | 3 => {
        // Code block executed if age equals 2 or 3
        msg!("The age is either 2 or 3");
    },
    4..=6 => {
        // Code block executed if age is in the 
        // range 4 to 6 (inclusive)
        msg!("The age is between 4 and 6");
    },
    _ => {
        // Code block executed for any other age
        msg!("The age is something else");
    }
}
```

### For Loops

- Default step
```rust
for i in 0..10 {
    // do something...
}
```

- Custom step
```rust
for i in (0..10).step_by(2) {
    // do something...
}     
```

### Arrays and Vectors

- Rust only has built-in support for `fixed arrays`.
- For dynamic-length lists, use `vectors`.

- Fixed array
```rust
// Declare an array of u32 with a fixed size of 5
let my_array: [u32; 5] = [10, 20, 30, 40, 50];

// Accessing elements of the array
let first_element = my_array[0];
let third_element = my_array[2];

// Declare a mutable array of u32 with a fixed size of 3
let mut mutable_array: [u32; 3] = [100, 200, 300];

// Change the second element from 200 to 250
mutable_array[1] = 250;
```

- Dynamic array
```rust
// Declare a dynamic array-like structure using Vec
let mut dynamic_array: Vec<u32> = Vec::new();

// Add elements to the dynamic array
dynamic_array.push(10);
dynamic_array.push(20);
dynamic_array.push(30);

// Accessing elements of the dynamic array
let first_element = dynamic_array[0];
let third_element = dynamic_array[2];
```

### Mappings
```rust
use std::collections::HashMap;

// Initialize the mapping
let mut my_map = HashMap::new();

// Add a key-value pair to the mapping
my_map.insert(key.to_string(), value.to_string());

// Log the value corresponding to a key from the mapping
msg!("My name is {}", my_map[&key]);
```

### Structs
```rust
// Defining a struct in Solana
struct Person {
    my_name: String,
    my_age: u64,
}

// Creating an instance of the struct
let mut person1: Person = Person {
    my_name: name,
    my_age: age,
};

msg!("{} is {} years old", person1.my_name, person1.my_age);

// Accessing and modifying struct fields
person1.my_name = "Bob".to_string();
person1.my_age = 18;

msg!("{} is {} years old", person1.my_name, person1.my_age);
```

### Constants
```rust
const MEANING_OF_LIFE_AND_EXISTENCE: u64 = 42;
```

### usize type and casting
```rust
let mut dynamic_array: Vec<u32> = Vec::from([1,2,3,4,5,6]);
let len = dynamic_array.len(); // this has type usize

let another_var: u64 = 5; // this has type u64

let len_plus_another_var = len as u64 + another_var;

msg!("The result is {}", len_plus_another_var);
```

### Try Catch
- Rust doesn't have `try catch`.
- Failures are expected to return `errors`, or `panic` for non-recoverable errors.

## References

- [Rust if/else](https://doc.rust-lang.org/rust-by-example/flow_control/if_else.html)
- [Rust if expressions (ternary equivalent)](https://doc.rust-lang.org/reference/expressions/if-expr.html)
- [Rust match](https://doc.rust-lang.org/rust-by-example/flow_control/match.html)
- [Rust for and range](https://doc.rust-lang.org/rust-by-example/flow_control/for.html)
- [Rust fixed array](https://doc.rust-lang.org/std/primitive.array.html)
- [Rust dynamic array (vectors)](https://doc.rust-lang.org/rust-by-example/std/vec.html)
- [Rust HashMap](https://doc.rust-lang.org/std/collections/struct.HashMap.html)
- [Rust structs](https://doc.rust-lang.org/rust-by-example/custom_types/structs.html)
- [Rust constants](https://doc.rust-lang.org/rust-by-example/custom_types/constants.html)
- [Rust usize](https://doc.rust-lang.org/std/primitive.usize.html)
