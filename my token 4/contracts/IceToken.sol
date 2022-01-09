// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract IceToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("IcemoToken","Icemo") public {
        _mint(msg.sender, initialSupply);
    _setupDecimals(0);
    }
}