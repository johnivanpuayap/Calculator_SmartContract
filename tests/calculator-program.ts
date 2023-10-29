import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { CalculatorProgram } from "../target/types/calculator_program";
import { assert } from "chai";


describe("calculator-program", () => {
  anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.getProvider();
  const keyPair = anchor.web3.Keypair.generate();
  const program = anchor.workspace.CalculatorProgram as Program<CalculatorProgram>;

  it("Is initialized!", async () => {
    await program.methods.initialize().accounts({
      calculator: keyPair.publicKey,
      signer: provider.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([keyPair]).rpc();

    const calculatorAccount = await program.account.calculator.fetch(keyPair.publicKey);
    assert.ok(Number(calculatorAccount.result) == 0);
  });

  it("Should add!", async () => {
    const num1: number = 2
    const num2: number = 1

    await program.methods.add(
      new anchor.BN(num1),
      new anchor.BN(num2),
    ).accounts({
      calculator: keyPair.publicKey,
    }).rpc();

    const calculatorAccount = await program.account.calculator.fetch(keyPair.publicKey);
    assert.ok(Number(calculatorAccount.result) == num1 + num2);
  });

  it("Should subtract!", async () => {
    const num1: number = 2
    const num2: number = 1

    await program.methods.subtract(
      new anchor.BN(num1),
      new anchor.BN(num2),
    ).accounts({
      calculator: keyPair.publicKey,
    }).rpc();

    const calculatorAccount = await program.account.calculator.fetch(keyPair.publicKey);
    assert.ok(Number(calculatorAccount.result) == num1 - num2);
  });

  it("Should multiply!", async () => {
    const num1: number = 2
    const num2: number = 1

    await program.methods.multiply(
      new anchor.BN(num1),
      new anchor.BN(num2),
    ).accounts({
      calculator: keyPair.publicKey,
    }).rpc();

    const calculatorAccount = await program.account.calculator.fetch(keyPair.publicKey);
    assert.ok(Number(calculatorAccount.result) == num1 * num2);
  });
  
  it("Should divide!", async () => {
    const num1: number = 2
    const num2: number = 1

    await program.methods.divide(
      new anchor.BN(num1),
      new anchor.BN(num2),
    ).accounts({
      calculator: keyPair.publicKey,
    }).rpc();

    const calculatorAccount = await program.account.calculator.fetch(keyPair.publicKey);
    assert.ok(Number(calculatorAccount.result) == num1 / num2);
    assert.ok(Number(calculatorAccount.remainder) == num1 % num2);
  });
});
