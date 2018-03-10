import React, { PureComponent, Fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Header from './Header/Header'
import Body from './Body/Body'
import Footer from './Footer/Footer'

class Home extends PureComponent {
  render() {
    const {
      isAuthLoading,
      data: { loading, loggedInUser },
      onLoginSuccess,
      onLoginError,
    } = this.props
    return (
      <Fragment>
        <Header
          isLoading={isAuthLoading || loading}
          user={loggedInUser}
          onLoginSuccess={onLoginSuccess}
          onLoginError={onLoginError}
        />
        <Body />
        <Footer />
      </Fragment>
    )
  }
}

const LOGGED_IN_USER = gql`
  query LoggedInUser {
    loggedInUser {
      id
      displayName
    }
  }
`

export default graphql(LOGGED_IN_USER, {
  options: { fetchPolicy: 'network-only' },
})(Home)
