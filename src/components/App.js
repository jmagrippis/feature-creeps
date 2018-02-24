import React, { PureComponent } from 'react'
import { ApolloProvider } from 'react-apollo'

import Home from './Home/Home'
import client from '../apolloClient'

class App extends PureComponent {
  render() {
    return (
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>
    )
  }
}

export default App
