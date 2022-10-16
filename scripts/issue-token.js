/* eslint-disable no-undef */
const DecentralBank = artifacts.require("DecentralBank");
/* eslint-disable no-undef */

module.exports = async function issueRewards(callback) {
    let decentralBank = await DecentralBank.deployed();
    await decentralBank.issueTokens();
    console.log("Rewards issued");
    callback();
}