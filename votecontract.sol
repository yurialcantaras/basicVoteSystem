// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    event VoteCast(address indexed voter, string vote);

    function vote(string calldata _vote) external {
        emit VoteCast(msg.sender, _vote);
    }
}
