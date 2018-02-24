import React, { PureComponent } from 'react'

class Post extends PureComponent {
  render() {
    const { title, body, author } = this.props

    return (
      <section>
        <h2>{title}</h2>
        <div>{body}</div>
        <aside>Posted by: {author.firstName} </aside>
      </section>
    )
  }
}

export default Post
