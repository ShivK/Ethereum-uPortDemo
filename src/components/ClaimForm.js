// Frameworks
import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AppActions from '../actions/AppActions'

import styled from 'styled-components'

const SharesWrap = styled.section`
  @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
    position: inherit;
  }
`
const SharesArea = styled.div``

const FormBuyshares = styled.form``
const FormRow = styled.div``
const NextButton = styled.button`
  margin-top: 20px;
`
const SubText = styled.p`
  margin: 0 auto 3em auto;
  fontSize: 18px;
`

class ClaimForm extends Component {

  constructor (props) {
    super(props)
    console.log("ClaimForm cons");
    this.submitClaim = this.submitClaim.bind(this)
    this.handlePolicyIdChange = this.handlePolicyIdChange.bind(this)
    this.handleBillIdChange = this.handleBillIdChange.bind(this)
    this.handleBillAmtChange = this.handleBillAmtChange.bind(this)
  }


  submitClaim () {      

    console.log('submitClaim',this.props.policyId,this.props.billId,this.props.billAmt)
    this.props.actions.submitClaimForm()
  }


  handlePolicyIdChange (event) {
    event.preventDefault()
    console.log("handlePolicyIdChange",event.target.value);

    this.props.actions.updatePolicyId(event.target.value)
  }

  handleBillIdChange (event) {
    event.preventDefault()
    console.log("handleBillIdChange",event.target.value);
    this.props.actions.updateBillId(event.target.value)
  }

  handleBillAmtChange (event) {
    event.preventDefault()
    console.log("handleBillAmtChange",event.target.value);
    this.props.actions.updateBillAmt(event.target.value)
  }
  
  componentDidMount () {
    console.log("componentDidMount");
  }

  render () {
    return (
      <SharesWrap>
        <h4>Claims Form</h4>
        <SubText>Fill in the claim</SubText>

        <SharesArea>

                <FormBuyshares>
                  <FormRow>
                    <label>Policy Id:</label>
                    <input
                      id='policyId'
                      type='string'
                      style={{"paddingLeft":".5em", "fontSize":"16px"}}
                      onChange={this.handlePolicyIdChange}
                      value={this.props.policyId} />
                  </FormRow>
                  <FormRow>
                    <label>Bills Ref: </label>
                    <input
                      id='billId'
                      type='string'
                      style={{"paddingLeft":".5em", "fontSize":"16px"}}
                      onChange={this.handleBillIdChange}
                      value={this.props.billId} />
                  </FormRow>
                  <FormRow>
                    <label>Bill  Amt: </label>
                    <input
                      id='billAmt'
                      type='number'
                      style={{"paddingLeft":".5em", "fontSize":"16px"}}
                      onChange={this.handleBillAmtChange}
                      value={this.props.billAmt} />
                  </FormRow>
                  <FormRow>
                      <br />
                  </FormRow>
                </FormBuyshares>
         
        </SharesArea>
              <NextButton
                onClick={this.submitClaim}>
                Submit
              </NextButton>

      </SharesWrap>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    policyId: state.App.policyId,
    billId: state.App.billId,
    billAmt: state.App.billAmt,
    error: state.App.error
  }
}
const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(AppActions, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(ClaimForm)
