import React from 'react'
import { mount } from 'enzyme'
import App from '../App'

describe('App', () => {
  it('Renders without error', () => {
    const wrapper = mount(<App />)
    expect(wrapper.find('h1').text()).toEqual('Hello world')
  })
})
