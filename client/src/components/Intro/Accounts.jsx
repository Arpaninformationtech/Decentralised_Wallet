import { useState, useEffect } from "react";
import "./main.css";

function Accounts({ web3, accountAddress }) {
  const [account, setAccount] = useState(null);
  const [accountBalance, setaccountBalance] = useState(null);
  const [provider, setProvider] = useState(null);
  useEffect(() => {
    const allAccounts = async () => {
      setProvider(web3.eth.currentProvider.host);
      console.log(web3.eth.currentProvider.host);
      var select = document.getElementById("selectNumber");
      var options = await web3.eth.getAccounts();

      for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
      }
    };
    web3 && allAccounts();
  }, [web3]);
  const selectAccount = async () => {
    let selectedAccountAddress = document.getElementById("selectNumber").value;
    accountAddress(selectedAccountAddress);
    let accountBalance = await web3.eth.getBalance(selectedAccountAddress);
    // let etherBalance  = await web3.utils.FromWei(accountBalance,"ether")
    setaccountBalance(accountBalance);
    setAccount(selectedAccountAddress);
  };
  return (
    <>
      <form className="label1" id="myForm">
        <label htmlFor="">Select an account</label>
        <select className="innerBox" id="selectNumber" onChange={selectAccount}>
          <option></option>
        </select>
      </form>
      <span className="conAc">Connected Account: {account}</span>
      <br></br>
      <span className="acBal">Account Balance:{accountBalance}wei</span>
      <br></br>
      <span className="provider">Provider : {provider}</span>
    </>
  );
}

export default Accounts;

