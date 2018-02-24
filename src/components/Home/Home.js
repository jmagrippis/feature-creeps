import React, { PureComponent, Fragment } from 'react'

import Header from '../Header/Header'
import Body from '../Body/Body'
import Footer from '../Footer/Footer'

class Home extends PureComponent {
  render() {
    return (
      <Fragment>
        <Header />
        <Body />
        <Footer />
      </Fragment>
    )
  }
}

export default Home
