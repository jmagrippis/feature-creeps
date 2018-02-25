import React, { PureComponent } from 'react'
import { GoogleLogout } from 'react-google-login'

class Logout extends PureComponent {
  logout() {
    try {
      localStorage.removeItem('graphToken')
      window.location.reload()
    } catch (err) {
      console.log('Error operating on localStorage', localStorage)
    }
  }

  render() {
    return <GoogleLogout buttonText="Logout" onLogoutSuccess={this.logout} />
  }
}

export default Logout
