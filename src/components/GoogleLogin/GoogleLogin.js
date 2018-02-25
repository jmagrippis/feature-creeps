import React, { PureComponent } from 'react'
import Login from 'react-google-login'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export class GoogleLogin extends PureComponent {
  onSuccess = async response => {
    const { authenticateGoogleUser } = this.props
    const googleToken = response.getAuthResponse().id_token
    const graphResponse = await authenticateGoogleUser({
      variables: { googleToken },
    })
    const graphToken = graphResponse.data.authenticateGoogleUser.token
    try {
      localStorage.setItem('graphToken', graphToken)
      window.location.reload()
    } catch (err) {
      console.log('Error operating on localStorage', localStorage)
    }
  }

  onFailure = response => {
    console.log('Could not login via Google:', response)
  }

  render() {
    return (
      <Login
        buttonText="Login via Google"
        clientId={process.env.REACT_APP_GOOGLE_CREDENTIALS_CLIENT_ID}
        onSuccess={this.onSuccess}
        onFailure={this.onFailure}
      />
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

export default graphql(AUTHENTICATE_GOOGLE_USER, {
  name: 'authenticateGoogleUser',
})(GoogleLogin)
