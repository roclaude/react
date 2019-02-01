import React, { Component } from 'react'

import FeedbackBox from './FeedbackBox.js'
import AdminPage from '../'

import '../admin.scss'


class Evaluation extends Component {

    constructor(props) {
        super(props)

        this.evaluationsList = [{
            id: 1234567890,
            name: 'Feedback Checkpoint Oct 2018',
            expire: 'Oct 26, 2018 11:59:59 PM'
        },{
            id: 2345678901,
            name: 'Feedback Checkpoint Oct 2017',
            expire: 'Sep 30, 2017 11:59:59 PM'
        },{
            id: 3456789012,
            name: 'Feedback Checkpoint Oct 2016',
            expire: 'Dec 26, 2016 11:59:59 PM'
        },{
            id: 4567890123,
            name: 'Feedback Checkpoint Oct 2015',
            expire: 'Jan 26, 2015 11:59:59 PM'
        }]
    }

    render() {

        return (
            <AdminPage pageType="evaluation" pageTitle="Evaluation">
                {this.evaluationsList.map((evaluation, index) =>
                    <FeedbackBox key={index} title={evaluation.name} evaluationId={evaluation.id} expireDate={evaluation.expire}/>
                )}
            </AdminPage>
        )
    }
}

export default Evaluation
