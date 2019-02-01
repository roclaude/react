import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './evaluation.scss'

class FeedbackBox extends Component {

    render() {

        const {title, expireDate, evaluationId} = this.props;

        return (
            <div className="feedback feedback-wrap">
                <div className="feedback-title">
                <Link to={`/assessment/${evaluationId}`}>{title}</Link>
                </div>
                <div className="feedbackdate">{expireDate}</div>
            </div>
        )
    }
}

export default FeedbackBox

