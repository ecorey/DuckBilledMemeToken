// SPDX-License-Identifier: MIT

// DuckbillToken deployed to: 0xAC4764c4B88BDCd141C8F1f36f7cB8c6ea7b4073
// and verified!

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract DuckBilledMemeToken is  ERC20Capped, ERC20Burnable, Pausable {
    

    // VARIABLES

    // variable declaring owner of the contract
    address payable private _owner;
    // variable declaring percent burned and deducted from every transaction to create deflation
    uint8 private _fee = 1; 
    // variable declaring the fixed initial token price in wei which is set at 0.0006180 usd
    uint256 public constant tokenPriceInWei = 201614;
    // variable declaring if fixed price is still in use of token has LP contract and is on Uniswap
    bool public isUniswapIntegrated = false;
    // variable that states the number of tokens that have been given as a minerReward
    uint256 public totalMinerRewards;



    // MODIFIERS

    // modifier to require that only the owner of the contract can execute certain functions
    modifier onlyOwner {
        require(msg.sender == _owner , "only owner can call this function");
        _;
    }



    // FUNCTIONS

    // getter function for the owner variable
    function owner() public view returns (address) {
        return _owner;
    }


    // constructor function that will set the total supply cap at 7.88 trillion
    constructor() ERC20("DuckBilledMemeToken" , "DBT") ERC20Capped(7880000000000000 * (10 ** decimals())) {
        _owner  = payable(msg.sender);
        _mint(msg.sender, (7880000000000000 * (10 ** decimals())) / 33);
    }


    // function that allows a token to be minted if the 7.88 trillion cap is not yet met
    function _mint(address account, uint256 amount) internal virtual override(ERC20, ERC20Capped) {
        require(ERC20.totalSupply() + amount <= cap(), "ERC20Capped: cap exceeded");
        super._mint(account, amount);
    }


    // function to allow the transfer of tokens from one account to another that includes the burn fee
    function _transfer(address from, address to, uint256 amount) internal virtual override {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");

        uint256 feeAmount = _calcFee(amount);
        uint256 transferAmount = _calcTransfer(amount, feeAmount);
        
        super._transfer(from, to, transferAmount);
        _burn(from, feeAmount);
    }
    

    // function to calculate the 1% fee on transactions that is burned
    function _calcFee(uint256 value) internal view returns (uint256) {
        return (value * _fee) / 100;
    }
    

    // function to calculate total amount after fee
    function _calcTransfer(uint256 amount, uint256 feeAmount) internal pure returns (uint256) {
        return amount - feeAmount;
    }


    // function to buy duckBill tokens at the fixed price and first checks that uniswap is not intergrated
    // fixed price is  0.0006180 of a penny
    function buyTokens(uint256 _tokensToBuy) external payable whenNotPaused {
        require(!isUniswapIntegrated, "Token is already on Uniswap");

        uint256 requiredEther = (_tokensToBuy * tokenPriceInWei) / (10 ** decimals());
        require(msg.value == requiredEther, "Incorrect ETH value sent");

        require(ERC20.totalSupply() + _tokensToBuy <= cap(), "Purchase would exceed cap");

        _mint(msg.sender, _tokensToBuy);
    }

    // function to burn a set number of tokens
    function burnTokens(uint256 _tokensToBurn) external {
        require(balanceOf(msg.sender) >= _tokensToBurn, "Insufficient tokens to burn");

        _burn(msg.sender, _tokensToBurn);
    }

    // function to get balance by address
    function getBalanceOfAddress(address _address) public view returns (uint256) {
        return balanceOf(_address);
    }


    // funtion to allow the owner of the contract to withdraw 
    function withdraw (uint amount) external onlyOwner {
        require(address(this).balance >= amount, "not enough in balnce to withdraw that amount");
        _owner .transfer(amount);
    }


    // function that allows the contract owner to pause the contract and sale of tokens
    function pauseSale() external onlyOwner {
        _pause();
    }


    // function that allows the contract owner to resume contract if paused
    function resumeSale() external onlyOwner {
        _unpause();
    }


    // function to allow contract owner to set if Uniswap is intergrated or not
    function integrateUniswap() external onlyOwner {
        isUniswapIntegrated = true;
    }


    // function that allows the owner of the contract to destroy the contract
    function destroy() public onlyOwner{
        selfdestruct(_owner);
    }

}
