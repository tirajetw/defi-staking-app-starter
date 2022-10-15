// eslint-disable-next-line no-undef
const Tether = artifacts.require("Tether");
// eslint-disable-next-line no-undef
const RWD = artifacts.require("RWD");
// eslint-disable-next-line no-undef
const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function(deployer) {
  await deployer.deploy(Tether);

  await deployer.deploy(RWD);

  await deployer.deploy(DecentralBank);
}
