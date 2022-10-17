import React, { Component } from "react";
import tether from "../tether.png";

class Main extends Component {
  render() {
    console.log("stakingBalance:", this.props.stakingBalance);
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
              <td>{this.props.stakingBalance} mUSDT</td>
              <td>RWD</td>
            </tr>
          </tbody>
        </table>
        <div className="card mb-2" style={{ opacity: ".9" }}>
          <form className="mb-3">
            <div style={{ boarderSpace: "0 lem" }}>
              <label className="float-left" style={{ marginLeft: "15px" }}>
                <b>Stake Tokens</b>
              </label>
              <span className="float-right" style={{ marginRight: "15px" }}>
                Balance: 0
              </span>
              <div className="input-group mb-4">
                <input type="text" placeholder="0" required />
                <div className="input-group-open">
                  <div className="input-group-text">
                    <img alt="tether" src={tether} height="32px" />
                     mUSDT
                  </div>
                </div>
              </div>
                <button type="submit" className="btn btn-primary btn-block">Deposit</button>
            </div>
          </form>
          <button type="submit" className="btn btn-primary btn-block">Withdraw</button>
          <div className="card-body text-center" style={{color:"blue"}}>
            Airdrop Tokens
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
