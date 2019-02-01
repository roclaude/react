import React, { Component } from 'react'
import PropTypes from "prop-types";

import './pageTitle.scss'

class PageTitle extends Component {

    render() {
        const { title } = this.props;

        return(
            <div className="page-title">
                <div className="page-title-inner">
                    <h1>{title}</h1>
                </div>
            </div>
        )
    }
}

PageTitle.propTypes = {
    title: PropTypes.string || 'Unknown'
}

export default PageTitle