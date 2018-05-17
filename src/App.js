// Frameworks
import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AppActions from './actions/AppActions'

import styled from 'styled-components'

// Components
import AppNavbar from './components/AppNavbar'
import Welcome from './components/Welcome'
import ClaimForm from './components/ClaimForm'
import VerifierLogin from './components/VerifierLogin'
import ClaimFormApprove from './components/ClaimFormApprove'
import ClientView from './components/ClientView'


const AppWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`

const AppBody = styled.div`
  flex: 1 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  max-width: 100%;
  padding: 20px;
`

class App extends Component {
  render () {
    return (
      <AppWrap>
        <AppNavbar />
        <AppBody>
          {
            !this.props.uport &&
            !this.props.claimFormPage
              ? <Welcome />
              : null
          }
          {
            this.props.claimFormPage === true &&
            !this.props.verifierLoginPage
              ? <ClaimForm />
              : null
          }
          {
            this.props.verifierLoginPage === true &&
            !this.props.claimFormApprovePage
              ? <VerifierLogin />
              : null
          }

          {
            this.props.claimFormApprovePage === true &&
            !this.props.clientViewPage
              ? <ClaimFormApprove />
              : null
          }
          
          {
            this.props.clientViewPage === true
            ? <ClientView />
              : null
          }
          
          </AppBody>
      </AppWrap>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    uport: state.App.uport,
    claimFormPage: state.App.claimFormPage,
    verifierLoginPage: state.App.verifierLoginPage,
    claimFormApprovePage: state.App.claimFormApprovePage,
    clientViewPage: state.App.clientViewPage
  }
}
const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(AppActions, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
