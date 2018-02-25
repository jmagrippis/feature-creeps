import React, { PureComponent, Fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Post from './Post/Post'

export class Posts extends PureComponent {
  render() {
    const { allPostsQuery: { allPosts, loading, refetch } } = this.props
    if (loading) {
      return (
        <div>
          Loading (from {process.env.REACT_APP_GRAPHQL_SIMPLE_ENDPOINT})
        </div>
      )
    }

    return (
      <Fragment>
        {allPosts &&
          allPosts.map(post => (
            <Post key={post.id} refresh={() => refetch()} {...post} />
          ))}
      </Fragment>
    )
  }
}

const ALL_POSTS_QUERY = gql`
  query AllPostsQuery {
    allPosts(orderBy: createdAt_DESC) {
      id
      title
      body
      author {
        id
        firstName
      }
    }
  }
`

export default graphql(ALL_POSTS_QUERY, {
  name: 'allPostsQuery',
  options: {
    fetchPolicy: 'network-only',
  },
})(Posts)
