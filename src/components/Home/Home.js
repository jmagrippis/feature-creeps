import React, { PureComponent, Fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Header from './Header/Header'
import Body from './Body/Body'
import Footer from './Footer/Footer'

class Home extends PureComponent {
  render() {
    const { data: { loading, loggedInUser } } = this.props
    return (
      <Fragment>
        <Header isLoading={loading} user={loggedInUser} />
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
    }
  }
`

export default graphql(LOGGED_IN_USER, {
  options: { fetchPolicy: 'network-only' },
})(Home)
