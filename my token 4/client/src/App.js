import React, { Component } from "react";
import IceToken from "./contracts/IceToken.json";
import IceTokenSale from "./contracts/IceTokenSale.json";
import ContractKyc from "./contracts/ContractKyc.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { loaded: false, kycAddress: "0x123.." };

  componentDidMount = async () => {
    try {
        // Get network provider and web3 instance.
        this.web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        this.accounts = await this.web3.eth.getAccounts();

        // Get the contract instance.
        //this.networkId = await this.web3.eth.net.getId(); <<- this doesn't work with MetaMask anymore
        this.networkId = await this.web3.eth.getChainId();      

        this.myToken = new this.web3.eth.Contract(
          IceToken.abi,
          IceToken.networks[this.networkId] && IceToken.networks[this.networkId].address,
        );

        this.iceTokenSale = new this.web3.eth.Contract(
          IceTokenSale.abi,
          IceTokenSale.networks[this.networkId] && IceTokenSale.networks[this.networkId].address,
        );
        this.ContractKyc = new this.web3.eth.Contract(
          ContractKyc.abi,
          ContractKyc.networks[this.networkId] && ContractKyc.networks[this.networkId].address,
        );

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        this.setState({ loaded:true });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }


  handleKycSubmit = async () => {
    const {kycAddress} = this.state;
    await this.kycContract.methods.setKycCompleted(kycAddress).send({from: this.accounts[0]});
    alert("Account "+kycAddress+" is now whitelisted");
  }
  
  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>IcemoToken token for IceToken</h1>
        <p>do not freeze, get your token</p>
        <h2>kyc whitelisting</h2>
        Address to allow: <input type="text" name="kycAddress" value={this.state.kycAddress} onChange={this.handleInputChange} />
        <button type="button" onClick={this.handleKycSubmit}>Add Address to Whitelist</button>
      </div>
    );
  }
}

export default App;
