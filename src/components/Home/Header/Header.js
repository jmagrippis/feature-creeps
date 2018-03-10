import React, { PureComponent } from 'react'
import { Login } from 'react-googleyolo'

import Logout from '../../Logout/Logout'

class Header extends PureComponent {
  renderLogin({ isLoading, user }) {
    if (isLoading) {
      return 'Loading auth...'
    }

    if (user) {
      return (
        <div>
          Logged in as {user.displayName}
          <Logout />
        </div>
      )
    }

    const { onLoginSuccess, onLoginError } = this.props

    return (
      <Login
        clientId={process.env.REACT_APP_GOOGLE_CREDENTIALS_CLIENT_ID}
        onLoginSuccess={onLoginSuccess}
        onLoginError={onLoginError}
      />
    )
  }

  render() {
    return (
      <div>
        <h1>Feature Creeps</h1>
        {this.renderLogin(this.props)}
      </div>
    )
  }
}

export default Header
