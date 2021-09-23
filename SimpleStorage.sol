// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
contract SimpleStorage {
//request
  string[] public condition=new string[](0);
  string[] public nameDO = new string[](0);
  string[] public nameRqP = new string[](0);
  string[] public purpose= new string[](0);
  string[] public startDate= new string[](0);
  string[] public expired = new string[](0);
  string[] public status = new string[](0);
//consent
  string[] public c_condition=new string[](0);
  string[] public c_nameDO = new string[](0);
  string[] public c_nameRqP = new string[](0);
  string[] public c_purpose= new string[](0);
  string[] public c_startDate= new string[](0);
  string[] public c_expired = new string[](0);
  string[] public c_status = new string[](0);
  string[] public c_nameRO = new string[](0);
//sticky policy
  string[] public s_condition=new string[](0);
  string[] public s_nameDO = new string[](0);
  string[] public s_nameRqP = new string[](0);
  string[] public s_purpose= new string[](0);
  string[] public s_startDate= new string[](0);
  string[] public s_expired = new string[](0);
  string[] public s_status = new string[](0);
  string[] public s_nameRO = new string[](0);

  string[] public hashData = new string[](0);

  constructor() public{
  }

  function checkCondition(string memory _condition) public view returns(bool){
    for(uint i=0; i<condition.length; i++){
      if(hashCompareInternal(condition[i],_condition)){
        return true;
      }
    }
    return false;
  }

//count of request
  function getConditionsCount() public view returns(uint){
    return condition.length;
  }
//count of consent
  function getC_conditionsCount() public view returns(uint){
    return c_condition.length;
  }
  //count of sticky policy
  function getS_conditionsCount() public view returns(uint){
    return s_condition.length;
  }

  function hashCompareInternal(string memory a, string memory b) pure private returns (bool) {
    return keccak256(bytes(a)) == keccak256(bytes(b));
  }
//new request
  function addRequest(string memory _condition, string memory _nameDO, string memory _nameRqP, string memory _purpose, string memory _startDate,string memory _expired, string memory _status) public{
    if(checkCondition(_condition)){
      return;
    }else{
      condition.push(_condition);
      nameDO.push(_nameDO);
      nameRqP.push(_nameRqP);
      purpose.push(_purpose);
      startDate.push(_startDate);
      expired.push(_expired);
      status.push(_status);
    }
  }
  //get content of request
  function getCondition(uint index) view public returns(string memory){
    return (condition[index]);
  }
  function getNameDo(uint index) view public returns(string memory){
    return (nameDO[index]);
  }
  function getNameRqP(uint index) view public returns(string memory){
    return (nameRqP[index]);
  }
  function getPurpose(uint index) view public returns(string memory){
    return (purpose[index]);
  }
  function getStartDate(uint index) view public returns(string memory){
    return (startDate[index]);
  }
  function getExpired(uint index) view public returns(string memory){
    return (expired[index]);
  }
  function getStatus(uint index) view public returns(string memory){
    return (status[index]);
  }
//new consent
  function addConsent(string memory _condition, string memory _nameDO, string memory _nameRqP, string memory _purpose, string memory _startDate,string memory _expired, string memory _status, string memory _nameRO) public{

      c_condition.push(_condition);
      c_nameDO.push(_nameDO);
      c_nameRqP.push(_nameRqP);
      c_purpose.push(_purpose);
      c_startDate.push(_startDate);
      c_expired.push(_expired);
      c_status.push(_status);
      c_nameRO.push(_nameRO);

  }
 // get content of consent
  function getC_condition(uint index) view public returns(string memory){
    return (c_condition[index]);
  }
  function getC_nameDo(uint index) view public returns(string memory){
    return (c_nameDO[index]);
  }
  function getC_nameRqP(uint index) view public returns(string memory){
    return (c_nameRqP[index]);
  }
  function getC_purpose(uint index) view public returns(string memory){
    return (c_purpose[index]);
  }
  function getC_startDate(uint index) view public returns(string memory){
    return (c_startDate[index]);
  }
  function getC_expired(uint index) view public returns(string memory){
    return (c_expired[index]);
  }
  function getC_status(uint index) view public returns(string memory){
    return (c_status[index]);
  }
  function getC_nameRO(uint index) view public returns(string memory){
    return (c_nameRO[index]);
  }
  //new sticky policy
  function addStickyPolicy(string memory _condition, string memory _nameDO, string memory _nameRqP, string memory _purpose, string memory _startDate,string memory _expired, string memory _status, string memory _nameRO) public{

    s_condition.push(_condition);
    s_nameDO.push(_nameDO);
    s_nameRqP.push(_nameRqP);
    s_purpose.push(_purpose);
    s_startDate.push(_startDate);
    s_expired.push(_expired);
    s_status.push(_status);
    s_nameRO.push(_nameRO);

  }
  // get content of sticky policy
  function getS_condition(uint index) view public returns(string memory){
    return (s_condition[index]);
  }
  function getS_nameDo(uint index) view public returns(string memory){
    return (s_nameDO[index]);
  }
  function getS_nameRqP(uint index) view public returns(string memory){
    return (s_nameRqP[index]);
  }
  function getS_purpose(uint index) view public returns(string memory){
    return (s_purpose[index]);
  }
  function getS_startDate(uint index) view public returns(string memory){
    return (s_startDate[index]);
  }
  function getS_expired(uint index) view public returns(string memory){
    return (s_expired[index]);
  }
  function getS_status(uint index) view public returns(string memory){
    return (s_status[index]);
  }
  function getS_nameRO(uint index) view public returns(string memory){
    return (s_nameRO[index]);
  }
//push hash of data from RO
  function saveHash(string memory _hash) public{
      hashData.push(_hash);
  }
  function getHashCount() public view returns(uint){
    return hashData.length;
  }
  function getHash(uint index) view public returns(string memory){
    return (hashData[index]);
  }
}