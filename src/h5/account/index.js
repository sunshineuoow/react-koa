import React from 'react'
import {hydrate} from 'react-dom'
import AccountForm from './container/index'

hydrate(
  <AccountForm />,
  document.getElementById('container')
)
