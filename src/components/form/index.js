import React, { Component } from 'react'
import PropTypes  from 'prop-types'

import './form.scss'


class Form extends Component {
    
    render() {

        return(
            <form { ...this.props }>
                {this.props.children}
            </form>
        )
    }
}


class Button extends Component {

    render() {
        const { value, type, className, onClick } = this.props
        const props = { type, className, onClick }

        return(
            <button { ...props } >
                {value}
            </button>
        )
    }
}

Button.propTypes = {
    value:      PropTypes.string.isRequired,
    type:       PropTypes.string || null,
    className:  PropTypes.string || null,
    onClick:    PropTypes.func || null
}


class Input extends Component {

    render() {
        const { label, value, ...props } = this.props

        return (
            <label>
                {label}
                <input { ... props } value={value} />
            </label>
        )
    }
}

Input.propTypes = {
    label:  PropTypes.string || null,
    value:  PropTypes.string || ''
}


class Alert extends Component {

    constructor() {
        super()

        this.messages = {
            error: 'Oops. Something went wrong!',
            success: 'Success!'
        }
    }

    render() {

        const { type } = this.props

        return (
            <div className={`alert alert-${type}`}>
                {this.messages[type]}
            </div>
        )
    }
}

Alert.propTypes = {
    type: PropTypes.string.isRequired
}


export default Form
export { Button, Input, Alert }