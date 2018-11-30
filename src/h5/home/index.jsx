import React from 'react'
import { hydrate } from 'react-dom'
import HomePage from './container'

hydrate(
  <HomePage/>,
  document.getElementById('container')
)
