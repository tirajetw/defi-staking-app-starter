/* eslint-disable no-undef */
const RWD = artifacts.require("RWD");
const Tether = artifacts.require("Tether");
const DecentralBank = artifacts.require("DecentralBank");
/* eslint-disable no-undef */

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("decentralBank", ([owner, customer]) => {
  let rwd, tether, decentralBank;

  function tokens(number) {
    return web3.utils.toWei(number, "ether");
  }

  before(async () => {
    // Load Contracts
    tether = await Tether.new();
    rwd = await RWD.new();
    decentralBank = await DecentralBank.new(rwd.address, tether.address);

    // Transfer all RWD tokens to DecentralBank (1 million)
    await rwd.transfer(decentralBank.address, web3.utils.toWei("1000000"));

    // Transfer 100 Mock Tether tokens to investor
    await tether.transfer(customer, web3.utils.toWei("100"), { from: owner });
  });

  describe("Mock Tether Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await tether.name();
      assert.equal(name, "Mock Tether Token");
    });
  });

  describe("RWD Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await rwd.name();
      assert.equal(name, "Reward Token");
    });
  });

  describe("Decentral Bank Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await decentralBank.name();
      assert.equal(name, "Decentral Bank");
    });

    it("contract has tokens", async () => {
      let balance = await rwd.balanceOf(decentralBank.address);
      assert.equal(balance.toString(), web3.utils.toWei("1000000"));
    });
  });

  describe("Yield Farming", async () => {
    it("rewards token for staking", async () => {
      let result;

      // Check investor balance before staking
      result = await tether.balanceOf(customer);
      assert.equal(
        result.toString(),
        tokens("100"),
        "customer Mock Tether wallet balance correct before staking"
      );

      // Check status for customer
      await tether.approve(decentralBank.address, tokens("100"), {
        from: customer,
      });
      await decentralBank.depositTokens(tokens("100"), { from: customer });

      // Check Updated balance of customer
      result = await tether.balanceOf(customer);
      assert.equal(result.toString(), tokens("0"), "Customer mock wallet balance correct after staking");

      // Check Updated balance of DecentralBank
      result = await tether.balanceOf(decentralBank.address);
      assert.equal(result.toString(), tokens("100"), "DecentralBank mock wallet balance correct after staking");

      // Is staking balance
      result = await decentralBank.isStaking(customer);
      assert.equal(result.toString(), "true", "Customer staking status correct after staking");

      // Issue Tokens
      await decentralBank.issueTokens({ from: owner });

      // Ensure only owner can issue tokens
      await decentralBank.issueTokens({ from: customer }).should.be.rejected;

      // Unstake tokens
      await decentralBank.unstakeTokens({ from: customer });

      // Check results after unstaking
      result = await tether.balanceOf(customer);
      assert.equal(result.toString(), tokens("100"), "Customer mock wallet balance correct after unstaking");
      
      // Is staking updated
      result = await decentralBank.isStaking(customer);
      assert.equal(result.toString(), "false", "Customer staking status correct after unstaking");

      
    });
  });
});
