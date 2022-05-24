import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import sha3 from "js-sha3";
import "./App.css";

class dc extends Component {
    state = {total:0, s_conditions:[], number:0, c_conditions:[], count:0, hashes:[], web3:null, accounts:null, contract:null};

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
        const { c_conditions, s_conditions,hashes,contract} = this.state;

        const response1=await contract.methods.getS_conditionsCount().call();
        const response2=await contract.methods.getC_conditionsCount().call();
        const response3=await contract.methods.getHashCount().call();

        for (var i = 0; i < Number(response1); i++) {

            var element={condition:"", nameDO:"", nameRqP:"", purpose:"", startDate:"", expired:"", status:"", nameRO:""};
            element.condition=await contract.methods.getS_condition(i).call();
            element.nameDO=await contract.methods.getS_nameDo(i).call();
            element.nameRqP=await contract.methods.getS_nameRqP(i).call();
            element.purpose=await contract.methods.getS_purpose(i).call();
            element.startDate=await contract.methods.getS_startDate(i).call();
            element.expired=await contract.methods.getS_expired(i).call();
            element.status=await contract.methods.getS_status(i).call();
            element.nameRO=await contract.methods.getS_nameRO(i).call();
            s_conditions[i]=element;
            console.log(s_conditions[i]);
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

            var element3={hash:""};
            element3.hash=await contract.methods.getHash(m).call();
            hashes[m]=element3;
        }
        this.setState({ total: Number(response1), s_conditions: s_conditions, number:Number(response2), c_conditions:c_conditions, count:Number(response3),hashes:hashes});

    };



    render() {

        return (
            <div className="App">
                <h2>DC Page</h2>

                <h3>List of Consents ({this.state.number})</h3>

                <ul>{
                    this.state.c_conditions.map((c,n)=>{
                        return <li key={n}>
                            Data Requester: {c.nameRqP}/  Data Subject:{c.nameDO}/
                            Authorized Start Date:{c.startDate}/ Purpose:{c.purpose}/
                            Authorized Expired: {c.expired}/  Data Type: {c.condition}/
                            Authorized Status:{c.status}/ Data Controller:{c.nameRO}
                            <button onClick={async ()=>{
                                var FileSaver = require("file-saver");
                                let receipt ={
                                    dataRequester:c.nameRqP,
                                    dataSubject:c.nameDO,
                                    purpose:c.purpose,
                                    authorizedStart:c.startDate,
                                    expired:c.expired,
                                    dataType:c.condition,
                                    status:c.status,
                                    dataController:c.nameRO
                                };
                                let hash=sha3.sha3_512(receipt.toString());
                                let f = {receipt:receipt, hashOfReceipt:hash};
                                var json = JSON.stringify(f);
                                var blob = new Blob([json], {type: "text/plain;charest=utf-8"});
                                FileSaver.saveAs(blob, "dsConsent.json");
                            }}>Download</button></li>
                    })
                }
                </ul>

                <h3>List of Sticky Policies ({this.state.total})</h3>

                <ul>{
                    this.state.s_conditions.map((person,i)=>{
                        return <li key={i}>
                            Data Requester: {person.nameRqP}/  Data Subject:{person.nameDO}/ Data Controller:{person.nameRO}/
                            Start Date:{person.startDate}/ Purpose:{person.purpose}/
                            Expired: {person.expired}/  Data Type: {person.condition}/
                            Authorized Status:{person.status}
                            </li>
                    })
                }
                </ul>

                <h3>Create a Policy</h3>
                <div align="center">

                    <table align="center">
                        <tr>
                            <td></td>
                            <td align="left">Welcome back, Halcon Medical Centre</td>
                        </tr>
                        <tr align="left">
                            <td>Data Subject:</td>
                            <td>
                                <input type="text" name="myDS" id="myDS" list="ds" required="required" placeholder="select or input"/>
                                <datalist name="ds" id="ds" >
                                    <option value="John Martin" id="1">John Martin</option>
                                    <option value="Mike Burton" id="2">Mike Burton</option>
                                    <option value="Alice Wang" id="3">Alice Wang</option>
                                    <option value="Rebecca Wood" id="4">Rebecca Wood</option>
                                </datalist>

                            </td>
                        </tr>
                        <tr align="left">
                            <td>Data Requester:</td>
                            <td>
                                <input type="text" name="myRQP" id="myRQP" list="rqp" required="required" placeholder="select or input"/>
                                <datalist name="rqp" id="rqp" >
                                    <option value="Alice Baker" id="1">Alice Baker</option>
                                    <option value="Mike Burton" id="2">Mike Burton</option>
                                    <option value="Bob Ying" id="3">Bob Ying</option>
                                    <option value="Rebecca Wood" id="4">Rebecca Wood</option>
                                </datalist>

                            </td>
                        </tr>
                        <tr align="left">
                            <td>Purpose:</td>
                            <td>
                                <table border="0">
                                    <tr style={{border:0, margin:0}}>
                                        <td><input value="read" type="radio" id="policyPurpose" name="policyPurpose" checked="checked"/>read</td>
                                        <td><input value="update" type="radio" id="policyPurpose" name="policyPurpose" />update</td>
                                        <td><input value="delete" type="radio" id="policyPurpose" name="policyPurpose" />delete</td>
                                        <td><input value="add" type="radio" id="policyPurpose" name="policyPurpose" />add</td>
                                        <td><input value="all" type="radio" id="policyPurpose" name="policyPurpose" />all</td>
                                    </tr>
                                </table>
                            </td>

                        </tr>
                        <tr align="left">
                            <td>Data Type:</td>
                            <td>
                                <input type="text" name="myType" id="myType" list="conditions" required="required" placeholder="select or input"/>
                                <datalist name="conditions" id="conditions" >
                                    <option value="allergies" id="1">allergies</option>
                                    <option value="treatments and medicines" id="2">treatments and medicines</option>
                                    <option value="EHRs" id="3">EHRs</option>
                                    <option value="others" id="4">others</option>
                                </datalist>

                            </td>
                        </tr>
                        <tr align="left">
                            <td>Start Date:</td>
                            <td><input type="date" name="policyStart" id="policyStart" min="1990-01-01" required="required"/></td>

                        </tr>
                        <tr align="left">
                            <td>Expired Date:</td>
                            <td><input type="date" name="policyExpired" id="policyExpired" required="required" /></td>
                        </tr>

                        <tr>
                            <td></td>
                            <td align="left">
                                <button onClick={async ()=>{
                                    let value1=document.getElementById("myType").value;

                                    let value2 =document.getElementById("myRQP").value;

                                    let value3 = document.getElementById("myDS").value;

                                    let value4;
                                    var obj = document.getElementsByName("policyPurpose");
                                    for (var i=0;i<obj.length;i++){
                                        if(obj[i].checked){
                                            //alert(obj[i].value);
                                            value4 = obj[i].value;
                                        }
                                    }

                                    let value5=document.getElementById("policyStart").value;
                                    let value6=document.getElementById("policyExpired").value;
                                    let value7="authorized";
                                    let value8="Halcon Medical Centre";
                                    const {total,s_conditions,accounts,contract } = this.state;

                                    await contract.methods.addStickyPolicy(value1, value3, value2, value4, value5,value6,value7,value8).send({from:accounts[0],gas: 555555});
                                    var e={condition:value1, nameDO: value3, nameRqP:value2, purpose:value4,startDate:value5, expired:value6, status:value7, nameRO:value8};
                                    s_conditions[s_conditions.length]=e;
                                    this.setState({total: total+1,s_conditions: s_conditions});
                                }}>Send</button>
                            </td>
                        </tr>
                    </table>
                </div>


                <h3>Hash Value of Required Data</h3>
                <div align="center"><input placeholder="input hash" type="text" id="hash" required="required" style={{width:400,height:20}}/></div>
                <button onClick={async ()=>{
                    let value1=document.getElementById("hash").value;
                    const {count,hashes,accounts,contract } = this.state;

                    await contract.methods.saveHash(value1).send({from:accounts[0],gas: 555555});
                    var e={hash:value1};
                    hashes[hashes.length]=e;
                    this.setState({count: count+1,hashes: hashes});
                }}>Share</button>

                <h3>My Receipts</h3>
                <h4>receipts of policies</h4>
                <ul>{
                    this.state.s_conditions.map((person,i)=>{
                        return <li key={i}>
                            ID: {i+1}/  Sticky Policy: {"dataController:"+person.nameRO+",dataRequester:"+person.nameRqP+",purpose:"+person.purpose+",dataSubject:"+person.nameDO+",startDate:"+person.startDate+",expired:"+person.expired+",dataType:"+person.condition+",status:"+person.status}

                            <button onClick={async ()=>{
                                var FileSaver = require("file-saver");
                                let receipt ={
                                    dataRequesterter:person.nameRqP,
                                    dataSubject:person.nameDO,
                                    purpose:person.purpose,
                                    start:person.startDate,
                                    end:person.expired,
                                    dataType:person.condition,
                                    status:person.status,
                                    dataController:person.nameRO
                                };
                                let hash=sha3.sha3_512(receipt.toString());
                                let f = {receipt:receipt, hashOfReceipt:hash};
                                var json = JSON.stringify(f);
                                var blob = new Blob([json], {type: "text/plain;charest=utf-8"});
                                FileSaver.saveAs(blob, "yourStickyPolicyReceipt.json");
                            }}>Download</button></li>
                    })
                }
                </ul>
                <h4>receipts of hash values shared</h4>
                <ul>{
                    this.state.hashes.map((h,m)=>{
                        return <li key={m}>
                            ID: {m+1}/  Content of hash: {h.hash}

                            <button onClick={async ()=>{
                                var FileSaver = require("file-saver");
                                let receipt ={
                                    hash:h.hash
                                };
                                let hash=sha3.sha3_512(receipt.toString());
                                let f = {receipt:receipt, hashOfReceipt:hash};
                                var json = JSON.stringify(f);
                                var blob = new Blob([json], {type: "text/plain;charest=utf-8"});
                                FileSaver.saveAs(blob, "yourHashSharedReceipt.json");
                            }}>Download</button></li>
                    })
                }
                </ul>

            </div>
        );
    };
}

export default dc;
