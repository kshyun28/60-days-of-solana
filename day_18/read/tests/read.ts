import * as anchor from "@coral-xyz/anchor";

describe("read", () => {
  anchor.setProvider(anchor.AnchorProvider.env());

  it("Read other account", async () => {
    // the other program's programdId -- make sure the address is correct
    const otherProgramAddress = "EW6R34TciFADwYMyWNeq5fQcpYsTd22Sf5GJKGES7Hnr";
    const otherProgramId = new anchor.web3.PublicKey(otherProgramAddress);

    // load the other program's idl -- make sure the path is correct
    const otherIdl = JSON.parse(
      require("fs").readFileSync("../other_program/target/idl/other_program.json", "utf8")
    );

    const otherProgram = new anchor.Program(otherIdl, otherProgramId);

    const seeds = []
    const [trueOrFalseAcc, _bump] =
      anchor.web3.PublicKey.findProgramAddressSync(seeds, otherProgramId);
    let otherStorageStruct = await otherProgram.account.trueOrFalse.fetch(trueOrFalseAcc);

    console.log("The value of flag is:", otherStorageStruct.flag.toString());
  });
});