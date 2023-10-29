use anchor_lang::prelude::*;

declare_id!("2aoPWftL1dCpAJwVh5TwAeqJ7jaBTNjN7fDigJ9uvW8r");

#[program]
pub mod calculator_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
