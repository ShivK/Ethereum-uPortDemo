// //////////////////////////////////////////////
// Connect uPort
// //////////////////////////////////////////////
//For Insurance Submitter
export const connectUport = (data) => {
  return {
    type: 'CONNECT_UPORT',
    data
  }
}

//For Insurance Verifier
export const connectUportV = (data) => {
  return {
    type: 'CONNECT_UPORTV',
    data
  }
}

export const submitClaimForm = () => {
  return {
    type: 'SUBMIT_CLAIM_FORM'
  }
}

export const updatePolicyId = (data) => {
  return {
    type: 'UPDATE_POLICY_ID',
    data
  }
}

export const updateBillId = (data) => {
  return {
    type: 'UPDATE_BILL_ID',
    data
  }
}

export const updateBillAmt = (data) => {
  return {
    type: 'UPDATE_BILL_AMT',
    data
  }
}

export const getPointsREQUEST = () => {
  return {
    type: 'GET_POINTS_REQUEST'
  }
}
export const getPosPointsSUCCESS = (data) => {
  return {
    type: 'GET_POS_POINTS_SUCCESS',
    data
  }
}
export const getNegPointsSUCCESS = (data) => {
  return {
    type: 'GET_NEG_POINTS_SUCCESS',
    data
  }
}
export const getPointsERROR = (data) => {
  return {
    type: 'GET_POINTS_ERROR',
    data
  }
}

export const toClientView = (data) => {
  return {
    type: 'TO_CLIENT_VIEW'
  }
}




// //////////////////////////////////////////////
// Add Points
// //////////////////////////////////////////////

export const addPointsREQUEST = (tx, amount) => {
  return {
    type: 'ADD_POINTS_REQUEST',
    amount: amount,
    buyingInProgress: true
  }
}
export const addPointsPENDING = () => {
  return {
    type: 'ADD_POINTS_PENDING'
  }
}

export const addPointsSUCCESS = (tx, data) => {
  return {
    type: 'ADD_POINTS_SUCCESS',
    tx: tx,
    data
  }
}


export const addPointsERROR = (data) => {
  return {
    type: 'ADD_POINTS_ERROR',
    data
  }
}

