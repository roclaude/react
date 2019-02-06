import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './evaluation.scss'

class FeedbackBox extends Component {

    render() {

        const { evaluations } = this.props

        return (
            <div>
                {evaluations.map((evaluation, index) => (
                    <div key={index} className="feedback feedback-wrap">
                        <div className="feedback-title">
                        <Link to={`/assessment/${evaluation.id}`}>{evaluation.name}</Link>
                        </div>
                        <div className="feedbackdate">
                            <span>Expires on: </span>
                            {evaluation.expire}
                        </div>
                    </div>
                )) }
            </div>
        )
    }
}

export default FeedbackBox

