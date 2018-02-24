import React from 'react'
import { mount } from 'enzyme'

import App from './App'

jest.mock('../apolloClient', () => ({}))

it('renders without crashing', () => {
  mount(<App />)
})
