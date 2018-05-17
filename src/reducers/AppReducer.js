let initialState = {
  p: 0 
}

export default(state = initialState, payload) => {
  switch (payload.type) {
    case 'CONNECT_UPORT':
      return {
        ...state,
        uport: payload.data,
        claimFormPage: true
      }
      case 'SUBMIT_CLAIM_FORM':
      return {
        ...state,
        verifierLoginPage: true
      }
      
    case 'CONNECT_UPORTV':
      return {
        ...state,
        uportV: payload.data,
        claimFormApprovePage: true
      }
      case 'UPDATE_POLICY_ID':
      return {
        ...state,
        policyId: payload.data
      }
      case 'UPDATE_BILL_ID':
      return {
        ...state,
        billId: payload.data
      }
      case 'UPDATE_BILL_AMT':
      return {
        ...state,
        billAmt: payload.data
      }
      case 'CLAIM_FORM_COMPLETE':
      return {
        ...state,
        signTransactionPage: true,
      }
      case 'GET_POINTS_REQUEST':
      return {
        ...state,
        gettingPoints: true
      }
    case 'GET_POS_POINTS_SUCCESS':
      return {
        ...state,
        totPosPoints: payload.data
      }
    case 'GET_NEG_POINTS_SUCCESS':
      return {
        ...state,
        gettingPoints: false,
        totNegPoints: payload.data
      }
    case 'GET_POINTS_ERROR':
      return {
        ...state,
        gettingPoints: false,
        error: payload.data
      }
    case 'TO_CLIENT_VIEW':
      return {
        ...state,
        clientViewPage: true
      }
      
    case 'ADD_POINTS_REQUEST':
      return {
        ...state,
        confirmingInProgress: true
      }
    case 'ADD_POINTS_PENDING':
      return {
        ...state,
        addingInProgress: true,
        confirmingInProgress: false
      }
      
    case 'ADD_POINTS_SUCCESS':
      return {
        ...state,
        txHash: payload.tx,
        addingInProgress: false
      }
      
    case 'ADD_POINTS_ERROR':
      return {
        ...state,
        addingInProgress: false,
        pointsTotal: payload.data
      }
      
      
    default:
      return state
  }
}
