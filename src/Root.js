import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import App from './App'
import Home from './pages/home'
import About from './pages/about'

const Root = ({store}) => (
    <Provider store={store}>
        <Router >
            <App />
        </Router>
    </Provider>
)

Root.PropTypes => {
    store: PropTypes.object
}

export default App