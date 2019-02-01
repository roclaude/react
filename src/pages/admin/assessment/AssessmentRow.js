import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './assessment.scss'


class AssessmentRow extends Component {

    constructor(props) {
        super(props)

        this.state = {
            readOnlyRow: true,
            evaluationDefault: this.props.evaluation,
            evaluation: this.props.evaluation,
        }

        this.onDeleteHandler    = this.onDeleteHandler.bind(this)
        this.onEditHandler      = this.onEditHandler.bind(this)
        this.onChangeEvaluation = this.onChangeEvaluation.bind(this)
        this.onCancelHandler    = this.onCancelHandler.bind(this)
        this.onSaveHandler      = this.onSaveHandler.bind(this)
    }

    componentWillReceiveProps() {
        console.log('componentWillReceiveProps', this.props.evaluation)
        this.setState({"evaluation": this.props.evaluation})
    }

    onDeleteHandler() {
        const id = this.props.evaluation.id
        this.props.deleteAction(id)

        console.log('onDeleteHandler: ', id)
    }

    onChangeEvaluation(event) {
        const inputs = event.target.parentNode.parentNode.getElementsByTagName('INPUT')

        this.setState({
            'evaluation': {
                id: this.props.evaluation.id,
                name: inputs.name.value,
                email: inputs.email.value,
                position: inputs.position.value,
                company: inputs.company.value,
                status: inputs.status.value
            }
        })

        //console.log(this.state)
    }

    onEditHandler(event) {
        this.setState({'readOnlyRow': !this.state.readOnlyRow})
        //console.log(this.state)
    }

    onCancelHandler() {
        this.setState({'readOnlyRow': !this.state.readOnlyRow})
    }

    onSaveHandler() {
        this.setState({'readOnlyRow': !this.state.readOnlyRow})

        this.props.saveAction(this.state.evaluation)

        //console.log(this.state)
    }

    render() {
        const { readOnlyRow, evaluation } = this.state

//        const { evaluation } = this.props

        const id = this.props.evaluation.id

        return (
            <tr>
                {Object.keys(evaluation).map((keya, index) => 
                    index > 0 
                    ? <td key={index}>
                        <input 
                            type="text" 
                            name={keya}
                            value={evaluation[keya] ? evaluation[keya] : ''} 
                            readOnly={readOnlyRow} 
                            onChange={this.onChangeEvaluation} />
                        </td>
                    : null )}

                <td>
                    {!readOnlyRow ? <button onClick={this.onSaveHandler}>Save</button> : null}
                    {!readOnlyRow ? <button onClick={this.onCancelHandler}>Cancel</button> : null}
                    {readOnlyRow ? <button onClick={this.onEditHandler}>Edit</button> : null}
                    {readOnlyRow ? <button onClick={this.onDeleteHandler}>Delete</button> : null}
                </td>
            </tr>
        )
    }
}
/*
AssessmentRow.propTypes = {
    editAction: PropTypes.func || null,
    deleteAction: PropTypes.func || null
}
*/

export default AssessmentRow