import React, { PureComponent } from 'react'
import { Logout as YoloLogout } from 'react-googleyolo'
import { withApollo } from 'react-apollo'

class Logout extends PureComponent {
  logout = () => {
    try {
      localStorage.removeItem('graphToken')
      const { client: { resetStore } } = this.props
      resetStore()
    } catch (err) {
      console.log('Error operating on localStorage', err)
    }
  }

  render() {
    return <YoloLogout onAutoSignInDisabled={this.logout} />
  }
}

export default withApollo(Logout)
