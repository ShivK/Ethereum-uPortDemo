import { web3 } from './uportSetup'

import checkAddressMNID from './checkAddressMNID'
import getPosPoints from './getPosPoints'
import getNegPoints from './getNegPoints'

const pollingLoop = (address, txHash, response, actions, pendingCB, successCB,type) => {
  setTimeout(function () {
    web3.eth.getTransaction(txHash, (error, response) => {
      if (error) { throw error }
      if (response === null) {
        response = { blockNumber: null }
      } // Some nodes do not return pending tx
      waitForMined(address, txHash, response, actions, pendingCB, successCB,type)
    })
  }, 1000) // check again in one sec.
}

async function waitForMined (address, txHash, response, actions, pendingCB, successCB,type) {
  if (response.blockNumber) {
    const addr = checkAddressMNID(address)
    if (type === "pos") {
      getPosPoints(addr, actions);
      console.log("waitForMined type",type);
    }else {
      getNegPoints(addr, actions);
      console.log("waitForMined type",type);
    }

    successCB()
  } else {
    pendingCB()
    pollingLoop(address, txHash, response, actions, pendingCB, successCB,type)
  }
}

export default waitForMined
