// Frameworks
import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AppActions from '../actions/AppActions'

import InsContract from '../utilities/InsContract'
import checkAddressMNID from '../utilities/checkAddressMNID'
import getPosPoints from '../utilities/getPosPoints'
import getNegPoints from '../utilities/getNegPoints'
import waitForMined from '../utilities/waitForMined'




import styled from 'styled-components'

const SharesWrap = styled.section`
  @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
    position: inherit;
  }
`
const SharesArea = styled.div``
const CurrentSharesArea = styled.div`
  margin-bottom: 20px;
`
const CurrentSharesNumber = styled.span`
  color: white;
`
const CredsTable = styled.table`
margin: auto;
text-align: left;
`
const CredsButton = styled.button`
margin-top: 20px;
`
const SubText = styled.p`
  margin: 0 auto 3em auto;
  fontSize: 18px;
`

class ClaimFormApprove extends Component {

  constructor (props) {
    super(props)
    this.getCurrentPoints = this.getCurrentPoints.bind(this)
    
    this.clickApprove = this.clickApprove.bind(this)
    this.clickReject = this.clickReject.bind(this)
  }

  getCurrentPoints () {
    const addr = checkAddressMNID(this.props.uport.address)
    const actions = this.props.actions
    getPosPoints(addr, actions)
    getNegPoints(addr, actions)
  }

  clickApprove () {      
    
    let points = 1  //add one pos point 
    const addr = checkAddressMNID(this.props.uport.address)
    const actions = this.props.actions
    
    console.log("approve",{points, addr, actions})
    
    this.props.actions.addPointsREQUEST(points)
        
    InsContract.addPosPoints(points, (error, txHash) => {
      console.log('addPosPoints')
      if (error) { this.props.actions.addPointsERROR(error) }
      waitForMined(addr, txHash, { blockNumber: null }, actions,
        () => {
          this.props.actions.addPointsPENDING()
        },
        (total) => {
          console.log('waitForMined complete')
          this.props.actions.addPointsSUCCESS(txHash, total)
        },
        "pos"
      )
    })              
  }  

  clickReject () {      
    
    let points = 1  //add one neg point 
    const addr = checkAddressMNID(this.props.uport.address)
    const actions = this.props.actions
    
    console.log("reject",{points, addr, actions})
    
    this.props.actions.addPointsREQUEST(points)
        
    InsContract.addNegPoints(points, (error, txHash) => {
      console.log('addNegPoints')
      if (error) { this.props.actions.addPointsERROR(error) }
      waitForMined(addr, txHash, { blockNumber: null }, actions,
        () => {
          this.props.actions.addPointsPENDING()
        },
        (total) => {
          console.log('waitForMined complete',total)
          this.props.actions.addPointsSUCCESS(txHash, total)
        },
        "neg"
      )
    })
 }  


     
  componentDidMount () {
    console.log("componentDidMount");
    // Populate existing points
    this.getCurrentPoints()   

  }

  render () {
    return (
      <SharesWrap>
        <h4>Claims Form For Approval</h4>
        <SubText>Verification</SubText>

        <SharesArea>
        <CurrentSharesArea >
            <span>Positive Points: </span>
            <CurrentSharesNumber>{this.props.totPosPoints}</CurrentSharesNumber>
            <br />
            <span>Negative Points: </span>
            <CurrentSharesNumber>{this.props.totNegPoints}</CurrentSharesNumber>
            <br />
        </CurrentSharesArea>
          
         <CurrentSharesArea >
            <span>Name: </span>
            <CurrentSharesNumber>{this.props.uport.name}</CurrentSharesNumber>
            <br/>
            <span>Policy Id: </span>
            <CurrentSharesNumber>{this.props.policyId}</CurrentSharesNumber>
            <br/>
            <span>Bills Ref: </span>
            <CurrentSharesNumber>{this.props.billId}</CurrentSharesNumber>
            <br/>
            <span>Bill Amt: </span>
            <CurrentSharesNumber>{this.props.billAmt}</CurrentSharesNumber>
          </CurrentSharesArea>
          <br />
            {
              this.props.addingInProgress
                ? <div>Transaction in progress. Please wait for notification on phone</div>
                : null
            }        
            {
            this.props.confirmingInProgress
              ? <div>Please confirm the transaction card on your phone</div>
              : null
            }  
 
        </SharesArea>
        <CredsTable>
            <tbody>
              <tr>
                <td>
                  <CredsButton onClick={this.clickApprove}>Approve</CredsButton>
                </td>
                <td>
                  <CredsButton onClick={this.clickReject}>Reject</CredsButton>
                </td>
                <td>
                  <CredsButton onClick={this.props.actions.toClientView}>To Client View</CredsButton>
                </td>
              </tr>
            </tbody>
        </CredsTable>

      </SharesWrap>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    uport: state.App.uport,
    uportV: state.App.uportV,
    policyId: state.App.policyId,
    billId: state.App.billId,
    billAmt: state.App.billAmt,
    error: state.App.error,
    totPosPoints: state.App.totPosPoints,
    totNegPoints: state.App.totNegPoints,
    //pointsTotal: state.App.pointsTotal,
    gettingPoints: state.App.gettingPoints,
    confirmingInProgress: state.App.confirmingInProgress,
    addingInProgress: state.App.addingInProgress,
    tx: state.App.tx,
    
  }
}
const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(AppActions, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(ClaimFormApprove)
