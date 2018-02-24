import React, { PureComponent } from 'react'

class Footer extends PureComponent {
  render() {
    return (
      <footer>
        Made with{' '}
        <span role="img" aria-label="purple heart">
          💜
        </span>{' '}
        in London
      </footer>
    )
  }
}

export default Footer
