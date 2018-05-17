import { web3 } from './uportSetup'

function InsContractSetup() {
  console.log("InsContractSetup Start");
  let InsABI = web3.eth.contract([{"constant": false,"inputs": [{"name": "v","type": "uint256"}],"name": "addPosPoints","outputs": [],"payable": false, "stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "addr","type": "address"}],"name": "getPosPoints","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "addr","type": "address"}],"name": "getNegPoints","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "v","type": "uint256"}],"name": "addNegPoints","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}]);
  let InsContractObj = InsABI.at("0xadb2a4c36a02c0a2fa01587c6c6aa09fa256462b")
  return InsContractObj
}

const InsContract = InsContractSetup()

export default InsContract

