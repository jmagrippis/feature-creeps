import React from 'react'
import { shallow } from 'enzyme'

import { App } from './App'

jest.mock('../apolloClient', () => ({}))

it('renders without crashing', () => {
  shallow(<App />)
})
