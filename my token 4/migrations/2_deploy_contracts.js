var IceToken = artifacts.require("./IceToken.sol");
var MyTokenSales = artifacts.require("./IceTokenSale.sol");
require('dotenv').config({path: '../.env'});

module.exports = async function(deployer) {
    let addr = await web3.eth.getAccounts();
    await deployer.deploy(IceToken, process.env.INITIAL_TOKENS);
    await deployer.deploy(KycContract);
    await deployer.deploy(IceTokenSales, 1, addr[0], IceToken.address, ContractKyc.address);
    let tokenInstance = await IceToken.deployed();
    await tokenInstance.transfer(IceTokenSales.address, 10000000);



};