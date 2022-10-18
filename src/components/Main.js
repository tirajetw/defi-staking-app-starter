import React, { Component } from "react";
import Web3 from "web3";
import tether from "../tether.png";
import Airdrop from "./Airdrop";

class Main extends Component {
  render() {
    return (
      <div id="content" className="mt-3">
        <table className="table text-muted text-center">
          <thead>
            <tr style={{ color: "black" }}>
              <th>Staking Balance</th>
              <th>Reward Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ color: "black" }}>
              <td>
                {Web3.utils.fromWei(this.props.stakingBalance, "ether")} mUSDT
              </td>
              <td>{Web3.utils.fromWei(this.props.rwdBalance, "ether")} RWD</td>
            </tr>
          </tbody>
        </table>
        <div className="card mb-2" style={{ opacity: ".9" }}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              let amount;
              amount = this.input.value.toString();
              amount = Web3.utils.toWei(amount, "ether");
              this.props.stakeTokens(amount);
            }}
            className="mb-3"
          >
            <div style={{ boarderSpace: "0 lem" }}>
              <label className="float-left" style={{ marginLeft: "15px" }}>
                <b>Stake Tokens</b>
              </label>
              <span className="float-right" style={{ marginRight: "15px" }}>
                Balance: {Web3.utils.fromWei(this.props.tetherBalance, "ether")}
              </span>
              <div className="input-group mb-4">
                <input
                  ref={(input) => {
                    this.input = input;
                  }}
                  type="text"
                  placeholder="0"
                  required
                />
                <div className="input-group-open">
                  <div className="input-group-text">
                    <img alt="tether" src={tether} height="32px" />
                    mUSDT
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Deposit
              </button>
            </div>
          </form>
          <button
            onClick={(event) => {
                event.preventDefault(
                this.props.unstakeTokens()
                )
            }}
            type="submit"
            className="btn btn-primary btn-block"
          >
            Withdraw
          </button>
          <div className="card-body text-center" style={{ color: "blue" }}>
            Airdrop Tokens: <Airdrop stakingBalance={this.props.stakingBalance}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
