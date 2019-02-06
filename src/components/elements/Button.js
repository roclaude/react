import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './button.scss'

export default class Button extends Component {

    constructor() {
       super()

       this.defaultClassName = 'button ';
    }

    render() {

        const { 
            text, 
            className, 
            ...rest }  = this.props

        return(
            <a className={this.defaultClassName + className} { ...rest }>
                {text}
            </a>
        )
    }
}

Button.propTypes = {
    text: PropTypes.string || null,
    className: PropTypes.string || null
}
