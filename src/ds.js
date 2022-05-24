import React, { Component} from "react";

import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import sha3 from "js-sha3";
import "./App.css";



class ds extends Component {
    state = {display_name: "none",storageValue:0, conditions:[], number:0, c_conditions:[], count:0, hashes:[], web3:null, accounts:null, contract:null};

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

        const response1=await contract.methods.getConditionsCount().call(); // for request
        const response2=await contract.methods.getC_conditionsCount().call(); // for consent

        //const response3=await contract.methods.getS_conditionsCount().call();
        const response4=await contract.methods.getHashCount().call();  // for hash

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
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.rqpFrom = React.createRef();
        this.doTo = React.createRef();
        this.expectStart = React.createRef();
        this.expectedEnd = React.createRef();
        this.myPurpose = React.createRef();
        this.myCondition = React.createRef();
        //this.myStatus = React.createRef();
        this.myRO = React.createRef();
    }
    handleSubmit= async (event) => {
        alert(`you input is FROM:` + this.rqpFrom.current.value + `/TO:`+ this.doTo.current.value +`/START:` +this.expectStart.current.value + `/END:`+this.expectedEnd.current.value
        + `/PURPOSE:`+this.myPurpose.current.value+`/CONDITIONS:`+this.myCondition.current.value + `/CONTROLLER:`+this.myRO.current.value);
        event.preventDefault();
        let value1=this.myCondition.current.value;
        let value2=this.doTo.current.value;
        let value3=this.rqpFrom.current.value;
        let value4=this.myPurpose.current.value;
        let value5=this.expectStart.current.value;
        let value6=this.expectedEnd.current.value;
        //let value7=this.myStatus.current.value;
        let value7="authorized";
        let value8=this.myRO.current.value;
        if(value1 !=="" && value2 !=="" && value3 !=="" && value4 !=="" && value5 !=="" && value6 !=="" && value7 !== "") {
        const {number,c_conditions,accounts,contract } = this.state;

        await contract.methods.addConsent(value1, value2, value3, value4, value5,value6, value7, value8).send({from:accounts[0],gas: 555555});
        var element={condition:value1, nameDO: value2, nameRqP:value3, purpose:value4,startDate:value5, expired:value6, status:value7, nameRO:value8};
        c_conditions[c_conditions.length]=element;
        this.setState({number: number+1,c_conditions: c_conditions});
         }
         else {
         alert(`all filed are required.`,);
        }

    };

    displayMe() {
        if (this.state.display_name === "none"){this.setState({display_name: "block",})}
        else if (this.state.display_name ==="block"){this.setState({display_name: "none",})}
    };


    render() {

        return (
            <div className="App">
                <h2>DS Page</h2>

                <h3>List of Requests ({this.state.storageValue})</h3>

                <div style={{float:'center', display:this.state.display_name}}>
                    <table bgcolor="#ffebcd">
                        <thead>
                        <tr>
                            <th>From</th>
                            <th>To</th>
                            <th>Start Date*</th>
                            <th>Expired*</th>
                            <th>Purpose*</th>
                            <th>Data Type*</th>
                            <th>Data Controller*</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.conditions.map((person,i)=>{
                                return <tr key={i}>
                                    <td><input readOnly="readOnly"  id="from" required="required" type="text" value={person.nameRqP} ref={this.rqpFrom}/></td>
                                    <td><input readOnly="readOnly"  id="to" required="required" type="text" value={person.nameDO} ref={this.doTo}/></td>
                                    <td><input id="start" required="required" type="text" defaultValue={person.startDate} ref={this.expectStart}/></td>
                                    <td><input id="expired" required="required" type="text" defaultValue={person.expired} ref={this.expectedEnd}/></td>
                                    <td>
                                        <input id="purpose" required="required" type="text" list="myPurpose" defaultValue={person.purpose} ref={this.myPurpose}/>
                                        <datalist name="myPurpose" id="myPurpose" >
                                            <option value="read" id="1">read</option>
                                            <option value="update" id="2">update</option>
                                            <option value="delete" id="3">delete</option>
                                            <option value="add" id="4">add</option>
                                            <option value="all" id="5">all</option>
                                        </datalist>
                                    </td>

                                    <td>
                                        <input id="conditions" required="required" type="text" list="myConditions" defaultValue={person.condition} ref={this.myCondition}/>
                                        <datalist name="myConditions" id="myConditions" >
                                            <option value="allergies" id="1">allergies</option>
                                            <option value="treatments and medicines" id="2">treatments and medicines</option>
                                            <option value="EHRs" id="3">EHRs</option>
                                            <option value="others" id="4">others</option>
                                        </datalist>
                                    </td>

                                    <td>
                                        <input ref={this.myRO} type="text" name="nameRO" id="nameRO" list="ro" required="required" placeholder="select or input"/>
                                        <datalist name="ro" id="ro" >
                                            <option value="Halcon Medical Centre" id="1">Halcon Medical Centre</option>
                                            <option value="Summerfield Primary Care Centre" id="2">Summerfield Primary Care Centre</option>
                                            <option value="Birmingham Treatment Centre" id="3">Birmingham Treatment Centre</option>
                                        </datalist>
                                    </td>

                                    <td>
                                        <button onClick={this.handleSubmit.bind(this)}>consent</button>
                                    </td>
                                </tr>
                            })
                        } </tbody>

                    </table>
                </div>
                <div><button onClick={this.displayMe.bind(this)}>View Details</button>
                <ul>{
                    this.state.conditions.map((person,i)=>{
                        return <li key={i}>
                            DataRequester: {person.nameRqP}/  DataSubject:{person.nameDO}/
                            Expected Start Date:{person.startDate}/
                            Expected Expired: {person.expired}/
                            Status:{person.status}
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
                            }}>Consent</button>
                        </li>
                    })
                }
                </ul>
                </div>

                <h3>List of Consents ({this.state.number})</h3>

                <ul>{
                    this.state.c_conditions.map((c,n)=>{
                        return <li key={n}>
                            Data Requester: {c.nameRqP}/  Data Subject:{c.nameDO}/
                            Authorized Start Date:{c.startDate}/ Purpose:{c.purpose}/
                            Authorized Expired: {c.expired}/  Data Type: {c.condition}/
                            Authorized Status:{c.status}/ Data Controller:{c.nameRO}
                            </li>
                    })
                }
                </ul>

                <h3>My Receipts</h3>
                <ul>{
                    this.state.c_conditions.map((person,m)=>{
                        return <li key={m}>
                            ID: {m+1}/  Content: {"dataSubject:"+person.nameDO+",dataRequester:"+person.nameRqP+",Purpose:"+person.purpose+",Start from:"+person.startDate+",Expired:"+person.expired+",Data Type:"+person.condition+",Status:"+person.status}

                            <button onClick={async ()=>{
                                var FileSaver = require("file-saver");
                                let receipt ={
                                    dataRequester:person.nameRqP,
                                    dataSubject:person.nameDO,
                                    purpose:person.purpose,
                                    startDate:person.startDate,
                                    expired:person.expired,
                                    dataType:person.condition,
                                    status:person.status,
                                    dataController:person.nameRO
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



                <h3>Records of Hash Values of Exchanged Data ({this.state.count})</h3>

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
