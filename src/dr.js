import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import sha3 from "js-sha3";
import "./App.css";

class dr extends Component {
    state = {storageValue:0, conditions:[], number:0, c_conditions:[], total:0, s_conditions:[], count:0, hashes:[], web3:null, accounts:null, contract:null};

    componentDidMount = async () => {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            const networkId = await web3.eth.net.getId();
            const deployedNetwork = SimpleStorageContract.networks[networkId];
            const instance = new web3.eth.Contract(
                SimpleStorageContract.abi,
                deployedNetwork && deployedNetwork.address
            );

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.setState({ web3, accounts, contract: instance }, this.readRequest);

        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };

    readRequest = async () => {
        const { s_conditions, c_conditions, hashes, conditions,contract} = this.state;

        const response1=await contract.methods.getConditionsCount().call();
        const response2=await contract.methods.getC_conditionsCount().call();
        const response3=await contract.methods.getS_conditionsCount().call();
        const response4=await contract.methods.getHashCount().call();

        for (var i = 0; i < Number(response1); i++) {

            var element1={condition:"", nameDO:"", nameRqP:"", purpose:"", startDate:"", expired:"", status:""};
            element1.condition=await contract.methods.getCondition(i).call();
            element1.nameDO=await contract.methods.getNameDo(i).call();
            element1.nameRqP=await contract.methods.getNameRqP(i).call();
            element1.purpose=await contract.methods.getPurpose(i).call();
            element1.startDate=await contract.methods.getStartDate(i).call();
            element1.expired=await contract.methods.getExpired(i).call();
            element1.status=await contract.methods.getStatus(i).call();
            conditions[i]=element1;
        }
        for (var n = 0; n < Number(response2); n++) {

            var element2={condition:"", nameDO:"", nameRqP:"", purpose:"", startDate:"", expired:"", status:"", nameRO:""};
            element2.condition=await contract.methods.getC_condition(n).call();
            element2.nameDO=await contract.methods.getC_nameDo(n).call();
            element2.nameRqP=await contract.methods.getC_nameRqP(n).call();
            element2.purpose=await contract.methods.getC_purpose(n).call();
            element2.startDate=await contract.methods.getC_startDate(n).call();
            element2.expired=await contract.methods.getC_expired(n).call();
            element2.status=await contract.methods.getC_status(n).call();
            element2.nameRO=await contract.methods.getC_nameRO(n).call();
            c_conditions[n]=element2;
        }
        for (var m = 0; m < Number(response3); m++) {

            var element3={condition:"", nameDO:"", nameRqP:"", purpose:"", startDate:"", expired:"", status:"", nameRO:""};
            element3.condition=await contract.methods.getS_condition(m).call();
            element3.nameDO=await contract.methods.getS_nameDo(m).call();
            element3.nameRqP=await contract.methods.getS_nameRqP(m).call();
            element3.purpose=await contract.methods.getS_purpose(m).call();
            element3.startDate=await contract.methods.getS_startDate(m).call();
            element3.expired=await contract.methods.getS_expired(m).call();
            element3.status=await contract.methods.getS_status(m).call();
            element3.nameRO=await contract.methods.getS_nameRO(m).call();
            s_conditions[m]=element3;
        }
        for (var k = 0; k < Number(response4); k++) {
            var element4={hash:""};
            element4.hash=await contract.methods.getHash(k).call();
            hashes[k]=element4;
        }
        this.setState({ storageValue: Number(response1),conditions: conditions, number:Number(response2), c_conditions:c_conditions, total:Number(response3), s_conditions:s_conditions,count:Number(response4),hashes:hashes});

    };
  render() {

    return (
      <div className="App">
          <h2>DR Page</h2>


          <h3>My Consent</h3>
          <div>numbers of consent from DS: {this.state.number}</div>
          <ul>{
              this.state.c_conditions.map((c,n)=>{
                  return <li key={n}>
                      From:{c.nameDO}   To: {c.nameRqP} Purpose:{c.purpose}
                      Authorized Start Date:{c.startDate} Authorized Expired: {c.expired}
                      Conditions: {c.condition} Authorized Status:{c.status}  Data Location:{c.nameRO}
                      <button onClick={async ()=>{
                          var FileSaver = require("file-saver");
                          let receipt ={
                              to:c.nameRqP,
                              from:c.nameDO,
                              purpose:c.purpose,
                              authorizedStart:c.startDate,
                              end:c.expired,
                              condition:c.condition,
                              status:c.status,
                              atLocation:c.nameRO
                          };
                          let hash=sha3.sha3_512(receipt.toString());
                          let f = {receipt:receipt, hashOfReceipt:hash};
                          var json = JSON.stringify(f);
                          var blob = new Blob([json], {type: "text/plain;charest=utf-8"});
                          FileSaver.saveAs(blob, "yourConsent.json");
                      }}>Download</button></li>
              })
          }
          </ul>

          <h3>My Sticky Policies</h3>
          <div>numbers of policies from DC: {this.state.total}</div>
          <ul>{
              this.state.s_conditions.map((s,m)=>{
                  return <li key={m}>
                      Data Subject:{s.nameDO}  Resource Owner:{s.nameRO}  To: {s.nameRqP}
                      Purpose:{s.purpose}
                      Start Date:{s.startDate} Expired: {s.expired}
                      Conditions: {s.condition} Authorized Status:{s.status}
                      <button onClick={async ()=>{
                          var FileSaver = require("file-saver");
                          let receipt ={
                              requestingParty:s.nameRqP,
                              dataSubject:s.nameDO,
                              purpose:s.purpose,
                              start:s.startDate,
                              end:s.expired,
                              condition:s.condition,
                              AuthorizedStatus:s.status,
                              resourceOwner:s.nameRO
                          };
                          let hash=sha3.sha3_512(receipt.toString());
                          let f = {receipt:receipt, hashOfReceipt:hash};
                          var json = JSON.stringify(f);
                          var blob = new Blob([json], {type: "text/plain;charest=utf-8"});
                          FileSaver.saveAs(blob, "yourPolicy.json");
                      }}>Download</button></li>
              })
          }
          </ul>

          <h3>Hash Values of Required Data</h3>
          <div>numbers of values from DC: {this.state.count}</div>
          <ul>{
              this.state.hashes.map((h,k)=>{
                  return <li key={k}>
                      Hash value of shared data:{h.hash}
                      <button onClick={async ()=>{
                          var FileSaver = require("file-saver");
                          let receipt ={
                              HashValue:h.hash
                          };
                          let hash=sha3.sha3_512(receipt.toString());
                          let f = {receipt:receipt, hashOfReceipt:hash};
                          var json = JSON.stringify(f);
                          var blob = new Blob([json], {type: "text/plain;charest=utf-8"});
                          FileSaver.saveAs(blob, "yourHash.json");
                      }}>Download</button></li>
              })
          }
          </ul>


          <h3>Send Request</h3>
          <div align="center">
          <input placeholder="From" type="text" id="from" required="required" style={{width:200,height:20}}/>
          <input placeholder="To" type="text" id="to" required="required" style={{width:200,height:20}}/>
          <input placeholder="Purpose:read/update/delete/add/all" type="text" id="policyPurpose" required="required" style={{width:200,height:20}}/>
          <input placeholder="Expected start date" type="text" id="policyStart" required="required" style={{width:200,height:20}}/>
          <input placeholder="Expired date" type="text" id="policyExpired" required="required" style={{width:200,height:20}}/>
          <input placeholder="conditions" type="text" id="conditions" required="required" style={{width:200,height:60}}/>
          </div>
          <button onClick={async ()=>{
              let value1=document.getElementById("conditions").value;
              let value2=document.getElementById("from").value;
              let value3=document.getElementById("to").value;
              let value4=document.getElementById("policyPurpose").value;
              let value5=document.getElementById("policyStart").value;
              let value6=document.getElementById("policyExpired").value;
              let value7="Null";
              const {storageValue,conditions,accounts,contract } = this.state;

              await contract.methods.addRequest(value1, value3, value2, value4, value5,value6,value7).send({from:accounts[0],gas: 555555});
              var e={condition:value1,nameDO: value3, nameRqP:value2, purpose:value4,startDate:value5, expired:value6, status:value7};
              conditions[conditions.length]=e;
              this.setState({storageValue: storageValue+1,conditions: conditions});
          }}>Send</button>

          <h3>My Receipts</h3>
          <ul>{
              this.state.conditions.map((r,i)=>{
                  return <li key={i}>
                      ID: {i+1}  Content: {r.nameRqP+" wants to "+r.purpose+" EHR of "+r.nameDO+" between "+r.startDate+" and "+r.expired+" with conditions "+r.condition+" that is "+r.status}

                      <button onClick={async ()=>{
                          var FileSaver = require("file-saver");
                          let receipt ={
                              from:r.nameRqP,
                              to:r.nameDO,
                              purpose:r.purpose,
                              start:r.startDate,
                              end:r.expired,
                              condition:r.condition,
                              status:r.status,
                              nameRO:"Null"
                          };
                          let hash=sha3.sha3_512(receipt.toString());
                          let f = {receipt:receipt, hashOfReceipt:hash};
                          var json = JSON.stringify(f);
                          var blob = new Blob([json], {type: "text/plain;charest=utf-8"});
                          FileSaver.saveAs(blob, "yourRequestReceipt.json");
                      }}>Download</button></li>
              })
          }
          </ul>

      </div>
    );
  };
}

export default dr;
