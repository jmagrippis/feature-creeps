import React, { PureComponent } from 'react'

import Posts from './Posts/Posts'

class Body extends PureComponent {
  render() {
    return (
      <main>
        Welcome to the show
        <Posts />
      </main>
    )
  }
}

export default Body
