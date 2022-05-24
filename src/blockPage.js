import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";


import "./App.css";

class blockPage extends Component {
    state = {myBlockNumber:[], myBlockHash:[], block_number:[], storageValue:0, conditions:[], number:0, c_conditions:[], total:0, s_conditions:[], count:0, hashes:[], web3:null, accounts:null, contract:null};

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

            const myblock_Number = await web3.eth.getBlockNumber();
            //const h = (await web3.eth.getBlock(4)).hash;
            //alert(`block number is` +myblock_Number);
            //alert(h);
            const {myBlockHash} = this.state;
            for (var i =0; i<myblock_Number;i++){
                myBlockHash[i] = (await web3.eth.getBlock(i)).hash;
                //alert(myBlockHash[i]);
            }


            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.setState({ web3, accounts, contract: instance, myBlockNumber: myblock_Number, myBlockHash: myBlockHash}, this.readRequest);

        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };

    readRequest = async () => {
        const { s_conditions, c_conditions, hashes, conditions,contract, block_number} = this.state;

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

            block_number[i] = await contract.methods.showBlockNumber(i+1).call();
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
        this.setState({block_number: block_number, storageValue: Number(response1),conditions: conditions, number:Number(response2), c_conditions:c_conditions, total:Number(response3), s_conditions:s_conditions,count:Number(response4),hashes:hashes});

    };




  render() {

    return (
      <div className="App">
          <h2>Blockchain Information Page</h2>


          <h3>List of transactions from data requester</h3>
          <ul>{
              this.state.conditions.map((r,i)=>{
                  return <li key={i}>
                      ID: {i+1}/ BlockNumber: {this.state.block_number[i]}/ BlockHash: {this.state.myBlockHash[(this.state.block_number[i])-1]}/
                      Content of Transaction: {"dataRequester:"+r.nameRqP+",Purpose:"+r.purpose+",dataSubject:"+r.nameDO+",startDate:"+r.startDate+",Expired:"+r.expired+",dataType:"+r.condition+",Status:"+r.status}

                      </li>
              })
          }
          </ul>

          <h3>List of transactions from data subject ({this.state.number})</h3>

          <ul>{
              this.state.c_conditions.map((c,n)=>{
                  return <li key={n}>
                      BlockNumber: {}/BlockHash: {}/
                      Content of Transaction:{ "DataSubject:"+c.nameDO+",DataRequester:"+c.nameRqP+",Purpose:"+c.purpose+",Authorized Start Date:"+c.startDate+",Authorized Expired:"+ c.expired+",dataType:"+c.condition+", Authorized Status:"+c.status+",  Data Controller:"+c.nameRO}
                  </li>
              })
          }
          </ul>

          <h3>List of transactions from data controller ({this.state.total+this.state.count})</h3>

          <ul>{
              this.state.s_conditions.map((s,m)=>{
                  return <li key={m}>
                      BlockNumber:{}/ BlockHash: {}/
                      Content of Transaction: {"Data Subject:"+s.nameDO+",  Data Controller:"+s.nameRO+",Data Requester:"+s.nameRqP+",Purpose:"+s.purpose+",Start Date:"+s.startDate+",Expired:"+s.expired+",dataType:"+s.condition+",Authorized Status:"+s.status}
                  </li>
              })
          }
          </ul>

          <ul>{
              this.state.hashes.map((h,k)=>{
                  return <li key={k}>
                      Hash value of shared data:{h.hash}
                      </li>
              })
          }
          </ul>

      </div>
    );
  };
}

export default blockPage;
