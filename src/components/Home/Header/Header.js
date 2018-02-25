import React, { PureComponent } from 'react'

import GoogleLogin from '../../GoogleLogin/GoogleLogin'
import Logout from '../../Logout/Logout'

class Header extends PureComponent {
  renderLogin({ isLoading, user }) {
    if (isLoading) {
      return 'Loading auth...'
    }

    if (user) {
      return <Logout />
    }

    return <GoogleLogin />
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
