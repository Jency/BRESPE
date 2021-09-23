import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import sha3 from "js-sha3";
import "./App.css";

class ds extends Component {
    state = {storageValue:0, conditions:[], number:0, c_conditions:[], count:0, hashes:[], web3:null, accounts:null, contract:null};

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
            this.setState({ web3, accounts, contract: instance }, this.readConsent);

        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };

    readConsent = async () => {
        const { c_conditions, conditions,hashes,contract} = this.state;

        const response1=await contract.methods.getConditionsCount().call();
        const response2=await contract.methods.getC_conditionsCount().call();

        //const response3=await contract.methods.getS_conditionsCount().call();
        const response4=await contract.methods.getHashCount().call();

        for (var i = 0; i < Number(response1); i++) {

            var element={condition:"", nameDO:"", nameRqP:"", purpose:"", startDate:"", expired:"", status:"", nameRO:""};
            element.condition=await contract.methods.getCondition(i).call();
            element.nameDO=await contract.methods.getNameDo(i).call();
            element.nameRqP=await contract.methods.getNameRqP(i).call();
            element.purpose=await contract.methods.getPurpose(i).call();
            element.startDate=await contract.methods.getStartDate(i).call();
            element.expired=await contract.methods.getExpired(i).call();
            element.status=await contract.methods.getStatus(i).call();
            element.nameRO="N/A";
            conditions[i]=element;
            console.log(conditions[i]);
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
            element2.nameRO=await contract.methods.getC_nameRO(n).call();;
            c_conditions[n]=element2;
        }


        for (var k = 0; k < Number(response4); k++) {

            var element4={hash:""};
            element4.hash=await contract.methods.getHash(k).call();
            hashes[k]=element4;
        }

        this.setState({ storageValue: Number(response1), number:Number(response2),conditions: conditions, c_conditions:c_conditions, count:Number(response4),hashes:hashes});

    };



    render() {

        return (
            <div className="App">
                <h2>DS Page</h2>

                <h3>Requests</h3>
                <div>count of requests from DR: {this.state.storageValue}</div>
                <ul>{
                    this.state.conditions.map((person,i)=>{
                        return <li key={i}>
                            From: {person.nameRqP}  To:{person.nameDO}
                            Expected Start Date:{person.startDate} Purpose:{person.purpose}
                            Expected Expired: {person.expired}  Conditions: {person.condition}
                            Status:{person.status} Data Location:{"Null"}
                            <button onClick={async ()=>{
                                let value1=person.condition;
                                let value2=person.nameDO;
                                let value3=person.nameRqP;
                                let value4=person.purpose;
                                let value5=person.startDate;
                                let value6=person.expired;
                                let value7="authorized";
                                let value8="Null";
                                const {number,c_conditions,accounts,contract } = this.state;

                                await contract.methods.addConsent(value1, value2, value3, value4, value5,value6, value7, value8).send({from:accounts[0],gas: 555555});
                                var element={condition:value1, nameDO: value2, nameRqP:value3, purpose:value4,startDate:value5, expired:value6, status:value7, nameRO:value8};
                                c_conditions[c_conditions.length]=element;
                                this.setState({number: number+1,c_conditions: c_conditions});
                            }}>Consent</button></li>
                    })
                }
                </ul>

                <h3>My Consent</h3>
                <div>count of consents: {this.state.number}</div>
                <ul>{
                    this.state.c_conditions.map((c,n)=>{
                        return <li key={n}>
                            To: {c.nameRqP}  From:{c.nameDO}
                            Authorized Start Date:{c.startDate} Purpose:{c.purpose}
                            Authorized Expired: {c.expired}  Conditions: {c.condition}
                            Authorized Status:{c.status} Data Location:{c.nameRO}
                            </li>
                    })
                }
                </ul>

                <h3>My Receipts</h3>
                <ul>{
                    this.state.c_conditions.map((person,m)=>{
                        return <li key={m}>
                            ID: {m+1}  Content: {person.nameDO+" authorised "+person.nameRqP+" to "+person.purpose+" EHR of "+person.nameDO+" from "+person.nameRO+" between "+person.startDate+" and "+person.expired+" with conditions "+person.condition+" that is "+person.status}

                            <button onClick={async ()=>{
                                var FileSaver = require("file-saver");
                                let receipt ={
                                    to:person.nameRqP,
                                    from:person.nameDO,
                                    purpose:person.purpose,
                                    start:person.startDate,
                                    end:person.expired,
                                    condition:person.condition,
                                    status:person.status,
                                    atLocation:person.nameRO
                                };
                                let hash=sha3.sha3_512(receipt.toString());
                                let f = {receipt:receipt, hashOfReceipt:hash};
                                var json = JSON.stringify(f);
                                var blob = new Blob([json], {type: "text/plain;charest=utf-8"});
                                FileSaver.saveAs(blob, "yourConsentReceipt.json");
                            }}>Download</button></li>
                    })
                }
                </ul>

                <h3>New Consent</h3>
                <div align="center">
                <input placeholder="From" type="text" id="from" required="required" style={{width:200,height:20}}/>
                <input placeholder="To" type="text" id="to" required="required" style={{width:200,height:20}}/>
                <input placeholder="Purpose:read/update/delete/add/all" required="required" type="text" id="purpose" style={{width:200,height:20}}/>
                <input placeholder="Expected start date" type="text" id="start" required="required" style={{width:200,height:20}}/>
                <input placeholder="Expired date" type="text" id="expired" required="required" style={{width:200,height:20}}/>
                <input placeholder="conditions" type="text" id="conditions" required="required" style={{width:200,height:60}}/>
                <input placeholder="status:authorized/rejected" type="text" id="status" required="required" style={{width:200,height:20}}/>
                <input placeholder="Data location/data controller" type="text" id="nameRO" required="required" style={{width:200,height:20}}/>
                </div>
                <button onClick={async ()=>{
                    let value1=document.getElementById("conditions").value;
                    let value2=document.getElementById("from").value;
                    let value3=document.getElementById("to").value;
                    let value4=document.getElementById("purpose").value;
                    let value5=document.getElementById("start").value;
                    let value6=document.getElementById("expired").value;
                    let value7=document.getElementById("status").value;
                    let value8=document.getElementById("nameRO").value;
                    const {number,c_conditions,accounts,contract } = this.state;

                    await contract.methods.addConsent(value1, value2, value3, value4, value5,value6,value7,value8).send({from:accounts[0],gas: 555555});
                    var e={condition:value1, nameDO: value2, nameRqP:value3, purpose:value4,startDate:value5, expired:value6, status:value7, nameRO:value8};
                    c_conditions[c_conditions.length]=e;
                    this.setState({number: number+1,c_conditions: c_conditions});
                }}>Send</button>

                <h3>History of Hash Values of Exchanged Data</h3>
                <div>numbers of values shared by DC: {this.state.count}</div>
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
                                FileSaver.saveAs(blob, "dcHash.json");
                            }}>Download</button></li>
                    })
                }
                </ul>
            </div>
        );
    };
}

export default ds;
