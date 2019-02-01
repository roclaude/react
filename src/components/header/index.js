import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import logo from './small_logo.png'

import './header.scss'

class Header extends Component {
	
	render() {
		return(
			<header className="App-header">
				<nav className="navbar">
					<Link to="/" className="navbar-brand">
						<img src={logo} alt="Team Delight" />
						<span>Team Delight</span>
					</Link>
					
					<div className="navbar-nav-wrap" id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link to="/evaluation">Evaluation</Link>
							</li>
						</ul>
					</div>
				</nav>
			</header>
		)
	}
}

export default Header



/*

	<li className="nav-item">
		<Link to="/">Home</Link>
	</li>
	<li className="nav-item">
		<Link to="/about">About</Link>
	</li>

 */












/*


					<button class="navbar-toggler">
						<span class="navbar-toggler-icon"></span>
					</button>

<li class="nav-item active">
	<a class="nav-link" href="#">Tutorial</a>
</li>
<li class="nav-item">
	<a class="nav-link" href="#">Evaluation</a>
</li>
<li class="nav-item">
	<a class="nav-link" href="#">Reviews</a>
</li>
<li class="nav-item">
	<a class="nav-link" href="#">Okrs Console</a>
</li>
<li class="nav-item">
	<a class="nav-link" href="#">Notifications</a>
</li>
<li class="nav-item">
	<a class="nav-link" href="#">Profile</a>
</li>
*/