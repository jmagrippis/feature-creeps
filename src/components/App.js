import React, { PureComponent } from 'react'
import { YoloProvider } from 'react-googleyolo'
import { graphql, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import Home from './Home/Home'

class App extends PureComponent {
  state = { isAuthLoading: true }

  onRetrieveSuccess = async credential => {
    this.setState({ isAuthLoading: false })

    const { authenticateGoogleUser } = this.props
    const googleToken = credential.idToken

    if (!googleToken) {
      console.log('Invalid credential received:', credential)
      return
    }

    const graphResponse = await authenticateGoogleUser({
      variables: { googleToken },
    })
    const graphToken = graphResponse.data.authenticateGoogleUser.token
    try {
      localStorage.setItem('graphToken', graphToken)
      const { client: { resetStore } } = this.props
      resetStore()
    } catch (err) {
      console.log('Error operating on localStorage', localStorage)
    }
  }

  onRetrieveError = err => {
    this.setState({ isAuthLoading: false })
  }

  render() {
    const { isAuthLoading } = this.state

    return (
      <YoloProvider
        clientId={process.env.REACT_APP_GOOGLE_CREDENTIALS_CLIENT_ID}
        onRetrieveSuccess={this.onRetrieveSuccess}
        onRetrieveError={this.onRetrieveError}
      >
        <Home
          isAuthLoading={isAuthLoading}
          onLoginSuccess={this.onRetrieveSuccess}
          onLoginError={this.onRetrieveError}
        />
      </YoloProvider>
    )
  }
}

const AUTHENTICATE_GOOGLE_USER = gql`
  mutation AuthenticateGoogleUserMutation($googleToken: String!) {
    authenticateGoogleUser(googleToken: $googleToken) {
      token
    }
  }
`

export default withApollo(
  graphql(AUTHENTICATE_GOOGLE_USER, {
    name: 'authenticateGoogleUser',
  })(App)
)
