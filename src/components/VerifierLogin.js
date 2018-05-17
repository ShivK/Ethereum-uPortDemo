// Frameworks
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AppActions from '../actions/AppActions'
import styled from 'styled-components'
import { Credentials, SimpleSigner } from 'uport'

const WelcomeWrapV = styled.section``
const ConnectUportV = styled.button``
const SubTextV = styled.p`
  margin: 0 auto 3em auto;
  font-size: 18px;
`

class VerifierLogin extends Component {

  constructor (props) {
    super(props)
    this.connectUportV = this.connectUportV.bind(this)
  }

  connectUportV () {
    console.log("request verifier credentials")
    //No login for now to avoid two mobile phones with uport
    var credentials = new Credentials({
      appName: 'A11 Insurance',
      address: '2odHUdxZB29bDvGda3QfC2cqYQ1YqsEhbwo',
      signer: SimpleSigner('57d08e26e2cd736410fde9adc5001b8d06e13e7d18a4cc20d92ef54af999a0b3')
    });

    console.log({credentials})
    this.props.actions.connectUportV(credentials)

  }

  render () {
    return (
      <WelcomeWrapV>
        <h4>Insurance Verifier - Damage Claims Module</h4>
        <SubTextV>Approve damage claim request</SubTextV>
        <ConnectUportV
          onClick={this.connectUportV}>
          Login (with uPort)
        </ConnectUportV>
      </WelcomeWrapV>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    uportV: state.App.uportV
  }
}
const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(AppActions, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(VerifierLogin)
