import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AboutBox extends Component {

    constructor(props) {
        super(props)

        this.defaultClassName = 'about-box '
    }

    render() {
        const { title, className, icon, children, ...props } = this.props

        return (
            <div className={this.defaultClassName + className} { ...props }>
                <h2 className="card-title">
                    { icon ? <img src={icon} title={title} alt={ title.toLowerCase().replace(/ /g, '-') } /> : null }
                    <span>{ title }</span>
                </h2>
                <div className="about-box-content">
                    { children }
                </div>
            </div>
        )
    }
}

AboutBox.propTypes = {
    title:      PropTypes.string || 'Unknown',
    className:  PropTypes.string || '',
    icon:       PropTypes.string || null
}

export default AboutBox