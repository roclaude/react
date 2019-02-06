import React, { Component } from 'react'

import FeedbackBox from './FeedbackBox.js'
import AdminPage from '../'

import '../admin.scss'

import firestoreDB from '../../../components/firestore'

class Evaluation extends Component {

    constructor(props) {
        super(props)

        this.state = {
            evaluations: []
        }
    }

    componentWillMount() {
        let assessment = []
		firestoreDB.collection('assessment').get().then(snapshot => {
			snapshot.docs.forEach(doc => {
                let item = doc.data()
                item.id = doc.id
                assessment.push(item)

                this.setState({evaluations: assessment})
            })
		})
    }

    render() {
        const { evaluations } = this.state

        return (
            <AdminPage pageType="evaluation" pageTitle="Evaluation">
                <FeedbackBox evaluations={evaluations} />
            </AdminPage>
        )
    }
}

export default Evaluation






/*
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
*/