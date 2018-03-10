import React from 'react'
import ReactDOM from 'react-dom'
import 'reset-css'
import { ApolloProvider } from 'react-apollo'

import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import client from './apolloClient'

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()
