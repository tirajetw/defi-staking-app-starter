/* eslint-disable no-undef */
const RWD = artifacts.require("RWD");
const Tether = artifacts.require("Tether");
const DecentralBank = artifacts.require("DecentralBank");
/* eslint-disable no-undef */

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("decentralBank", ([ owner, customer ]) => {
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
});
