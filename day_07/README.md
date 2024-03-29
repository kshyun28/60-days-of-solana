# Day 7: The unusual syntax of Rust

[Day 7](https://www.rareskills.io/post/rust-weird-syntax) of [RareSkills Solana Course](https://www.rareskills.io/solana-tutorial).

## Setup

1. Configure Solana to run on localhost: `solana config set --url localhost`
2. Run the test validator node on another terminal: `solana-test-validator`
3. Run Solana logs on another terminal: `solana logs`
4. Build Anchor program: `anchor build`
5. Sync program_id with Anchor key: `anchor keys sync`
6. Run tests: `anchor test --skip-local-validator`

## Notes

### Ownership and Borrowing

#### Rust Copy Type

- A `copy type` is a datatype that is small enough that the overhead of copying the value is trivial.
- Rust makes a distinction between `copy types` and `non-copy types` because Rust wants us to be explicit about how we want large data to be handled.
  - It will not `copy` data behind the scenes like how dynamic languages do.
- The following types are `copy types`:
  - `integers`, `floats`, and `unsigned` integers
  - `booleans`
  - `char`
- The following types are `non-copy types`:
  - `Strings`
  - `vectors`
  - `structs`

#### Ownership in Rust

- If we want another variable to `view` the value (get read-only access), we use the `&` operator.
- `&` can be thought of as `view only` mode.
- Using `&` is called `borrowing`.
- A value can be cloned using `clone()`.
- Ownership is only an issue with `non-copy types`.

### The `mut` keyword

- All variables are `immutable` in Rust by default unless the `mut` keyword is specified.
```rust
// This will not compile
let counter = 0;

// This will compile
let mut counter = 0;
```

### Generics in Rust: the `<>` syntax
```rust
// derive the debug trait so we can print the struct to the console
#[derive(Debug)]
struct MyValues<T> {
    foo: T,
}

struct MyValues<T, U> {
    foo: T,
	  bar: U,
}

pub fn main() {
    let first_struct: MyValues<i32> = MyValues { foo: 1 }; // foo has type i32
    let second_struct: MyValues<bool> = MyValues { foo: false }; // foo has type bool
    
    println!("{:?}", first_struct);
    println!("{:?}", second_struct);
}
```

### Options, Enums, and Deref*

#### The Rust Option

- An `Option` is an enum which can contain either the expected value, or a special value that indicates "nothing was there".
- To turn an `Option` into the underlying type, we use `unwrap()`.
- `unwrap()` will cause a panic if we received "nothing".
```rust
fn main() {
	let v = Vec::from([1,2,3,4,5]);

	assert!(v.iter().max().unwrap() == 5);
}
```

#### The deref `*` operator

-  A `dereference` operation is used to convert a `view` of a type to a `regular` type.

### Result vs Option in Rust

- An `Option` is used when we might receive something `empty`.
- A `Result` is used when we might receive an `error`.
- Result Enum
```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

### The `?` operator

- The `?` operator can only be used in functions that return a `Result`.
- The `?` operator is syntactic sugar for returning either an `Err` or `Ok`.
- The `?` operator is used to extract data from the `Result<T, E>` enum and return:
  - `Ok(T)` if the function execution is `successful`.
  - or `Err(E)` if there is an `error`.

## References

- [Rust Copy types](https://dhghomon.github.io/easy_rust/Chapter_19.html)
- [Rust Ownership](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html)
- [Rust References and Borrowing](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html)
- [Rust Borrowing example](https://doc.rust-lang.org/rust-by-example/scope/borrow.html)
- [Rust Clone](https://doc.rust-lang.org/std/clone/trait.Clone.html)
- [Rust `mut`](https://doc.rust-lang.org/std/keyword.mut.html)
- [Rust generics](https://doc.rust-lang.org/book/ch10-01-syntax.html)
- [Rust Option](https://doc.rust-lang.org/std/option/enum.Option.html)
- [Rust Enum](https://doc.rust-lang.org/book/ch06-01-defining-an-enum.html)
- [Rust Deref](https://doc.rust-lang.org/std/ops/trait.Deref.html)
- [Rust `?`](https://web.mit.edu/rust-lang_v1.25/arch/amd64_ubuntu1404/share/doc/rust/html/reference/expressions/operator-expr.html#the-question-mark-operator)
