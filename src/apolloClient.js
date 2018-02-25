import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_SIMPLE_ENDPOINT,
})
const middlewareLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('graphToken')
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  })
  return forward(operation)
})

const link = middlewareLink.concat(httpLink)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

export default client
