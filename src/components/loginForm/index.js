import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './loginForm.scss'

import Form, { Input, Button, Alert } from '../form'

class LoginForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: localStorage.getItem('loginEmail') || '',
            password: '',
            showAlert: false,
            loginError: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()

        this.setState({'showAlert': true})

        if (this.state.email && this.state.password) {
            this.setState({'loginError': false})
            console.log( 'The form was submitted: ' + this.state.email + '  |  ' + this.state.password )
            localStorage.removeItem('loginEmail')
        } else {
            this.setState({'loginError': true})
        }
    }

    handleChange(event) {

        this.setState({[event.target.type]: event.target.value})

        if (event.target.type === 'email') {
            localStorage.setItem('loginEmail', event.target.value)
        }
    }

    render() {
        const { showAlert, loginError } = this.state
        const { closeForm } = this.props

        return (
            <div className="login-form-wrap">       
                <div className="login-form-inner" >
                    <Button className="close-form" value="+" onClick={closeForm} />
                    <Form onSubmit={this.handleSubmit}>
                        { showAlert ? <Alert type={ loginError ? 'error' : 'success' } /> : null }
                        <Input label="Email" type="email" onChange={this.handleChange} value={this.state.email} />
                        <Input label="Password" type="password" onChange={this.handleChange} value={this.state.password} />
                        <Button type="submit" className="button" value="Submit" />
                    </Form>
                </div>            
            </div>
        )
    }
}

LoginForm.propTypes = {
    closeForm: PropTypes.func.isRequired
}

export default LoginForm
