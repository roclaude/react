import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './elements.scss'

export default class Button extends Component {

    constructor() {
       super()

       this.defaultClassName = 'button ';
    }

    render() {

        const { text, className, ...props }  = this.props

        return(
            <a className={this.defaultClassName + className} { ...props }>
                {text}
            </a>
        )
    }
}

Button.propTypes = {
    text: PropTypes.string || null,
    className: PropTypes.string || null
}
