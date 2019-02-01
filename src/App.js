import React, { Component } from 'react'

import './App.scss'

import {BrowserRouter as Router, Route} from 'react-router-dom'

import Header from './components/header'

import Home from './pages/home'
import About from './pages/about'

import Evaluation from './pages/admin/evaluation'
import Assessment from './pages/admin/assessment'

class App extends Component {
  render() {
    return (
			<Router>
				<div className="App">
					<Header />
					<main className="main-content">
						<Route exact path="/" component={Home} />
						<Route exact path="/about" component={About} />
						<Route exact path="/evaluation" component={Evaluation} />
						<Route path="/assessment/:id" component={Assessment} />

					</main>
				</div>
			</Router>
    );
  }
}

export default App;


// 	