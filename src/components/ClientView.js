// Frameworks
import React, { Component } from 'react'
import { uport } from '../utilities/uportSetup'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AppActions from '../actions/AppActions'

import checkAddressMNID from '../utilities/checkAddressMNID'
import getPosPoints from '../utilities/getPosPoints'
import getNegPoints from '../utilities/getNegPoints'




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
text-align:buySharesDemoComplete left;
`
const CredsButton = styled.button`
margin-top: 20px;
`
const SubText = styled.p`
  margin: 0 auto 3em auto;
  fontSize: 18px;
`

class ClientView extends Component {

  constructor (props) {
    super(props)
    this.getCurrentPoints = this.getCurrentPoints.bind(this)
    
    this.clickGetRep = this.clickGetRep.bind(this)
  }

  getCurrentPoints () {
    const addr = checkAddressMNID(this.props.uport.address)
    const actions = this.props.actions
    getPosPoints(addr, actions)
    getNegPoints(addr, actions)
  }

  clickGetRep () {      
    console.log('clickGetRep')
    uport.attestCredentials({
        sub: this.props.uport.address,
        claim: {
          "Reputation": {
              PositivePoints: this.props.totPosPoints,
              NegativePoints: this.props.totNegPoints,
              Date: new Date().toDateString()
          }
        },
        exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000 * 12 ,  // one year from now
        uriHandler: (log) => { console.log(log) }
      })
  }
 

 
     
  componentDidMount () {
    console.log("componentDidMount");
    this.getCurrentPoints()   
  }

  render () {
    return (
      <SharesWrap>
        <h4>View Claim Status</h4>
        <SubText>Claim</SubText>

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

         
        </SharesArea>
        <CredsTable>
            <tbody>
              <tr>
                <td>
                  <CredsButton onClick={this.clickGetRep}>Get Reputation</CredsButton>
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
    gettingPoints: state.App.gettingPoints,
    sharesInput: state.App.sharesInput,
    confirmingInProgress: state.App.confirmingInProgress,
    buyingInProgress: state.App.buyingInProgress,
    tx: state.App.tx,
    
  }
}
const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(AppActions, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(ClientView)
