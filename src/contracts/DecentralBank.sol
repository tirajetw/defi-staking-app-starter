pragma solidity ^0.5.0;

import "./RWD.sol";
import "./Tether.sol";

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;

    Tether public tether;
    RWD public rwd;

    address[] public stakers;

    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(RWD _rwd, Tether _tether) public {
        owner = msg.sender;
        rwd = _rwd;
        tether = _tether;
    }

    function depositTokens(uint256 _amount) public {
        // require staking amount greater than 0
        require(_amount > 0, "amount cannot be 0");

        // Transfer tether tokens to this contract for staking
        tether.transferFrom(msg.sender, address(this), _amount);

        // Update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update staking balance
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // Unstaking tokens (Withdraw)
    function unstakeTokens() public {
        uint balance = stakingBalance[msg.sender];
        // require amount greater than 0
        require(balance > 0, "staking balance cannot be 0");

        // Transfer tokens to the specified contract address from our bank
        tether.transfer(msg.sender, balance);

        // Reset staking balance
        stakingBalance[msg.sender] = 0;

        // Update staking status
        isStaking[msg.sender] = false;

    }

    // Issue rewards
    function issueTokens() public {
        // require the owner to issue tokens only
        require(msg.sender == owner, "caller must be the owner");

        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 balance = stakingBalance[recipient] / 9; // / 9 to create percentage incentive for staking
            if (balance > 0) {
                rwd.transfer(recipient, balance);
            }
        }
    }
}
