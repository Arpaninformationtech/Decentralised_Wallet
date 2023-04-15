import { useState } from "react";
import "./main.css";

function SendEther({ web3, account }) {
  const [receipt, setReceipt] = useState({});
  const [toggle, setToggle] = useState(false);
  function sendEther(event)  {
    event.preventDefault();
    // const _from = document.querySelector("#from");
    const _to = document.querySelector("#to");
    const _value = document.querySelector("#value");
    const weiValue = web3.utils.toWei(_value.value, "ether");
    web3.eth
      .sendTransaction({
        from: account, //_from.value,
        to: _to.value,
        value: weiValue,
      })
      .then(function (receipt) {
        setReceipt(receipt);
        setToggle(true);
      });
  };
  return (
    <>
      <form className = "box" onSubmit={sendEther}>
        {/* <p>
          <input type="text" id="from" placeholder="from"></input>
        </p> */}
        <p className="label">
          <label classNmae ="reciever" type="text" id="to">Enter thr account to send</label>
          <input type="text" id="to" placeholder="to"></input>
        </p>
        <p className="label">
        <label htmlFor =""  >Enter Amount to Send </label>
          <input className = "receiver" type="text" id="value" placeholder="value"></input>
        </p>
        <button className="btn" type="submit">
        Send
        </button>
      </form>
      <div className = "box">
      <pre className = "json">
      <h3>(Json Response)</h3>
        <code>
          {toggle &&
            JSON.stringify(
              receipt,
              ["transactionHash", "blockHash", "blockNumber", "gasUsed"],
              2
            )}
        </code>
      </pre>
      </div>
    </>
  );
}

export default SendEther;
