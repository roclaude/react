import React, { Component } from 'react'

import './home.scss'

import Footer from '../../components/footer'
import Button from '../../components/elements/Button'

import LoginForm from '../../components/loginForm'


class Home extends Component {

    constructor() {
        super()

        this.state = {
            openedForm: false,
        }

        this.handleOpenForm = this.handleOpenForm.bind(this)
    }

    handleOpenForm(event) {
        event.preventDefault()

        this.setState({ openedForm: !this.state.openedForm })
    }

    render() {
        const { openedForm } = this.state

        return(
            <div className="page page-home">
				<div className="content-page">
                    <div className="banner-wrapper">
                        <h2>Team Delight</h2>
                        <h3>Work better together</h3>
                        <p>
                            <Button href="/" text="Login with Google" className="google-login" />
                            <Button text="Login" className="normal-login" onClick={this.handleOpenForm}/>
                        </p>
                        <p>
                            <Button href="/about" text="About" className="my-button about-button" />
                        </p>
                    </div>
                </div>
                { openedForm ? <LoginForm closeForm={this.handleOpenForm} /> : null }
                <Footer />
            </div>
        )
    }
}

export default Home;
