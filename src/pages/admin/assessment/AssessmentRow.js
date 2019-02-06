import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './assessment.scss'


class AssessmentRow extends Component {

    constructor(props) {
        super(props)

        this.state = {
            readOnlyRow: true,
            id: this.props.evaluation.id,
        }

        this.onDeleteHandler    = this.onDeleteHandler.bind(this)
        this.onEditHandler      = this.onEditHandler.bind(this)
        this.onChangeEvaluation = this.onChangeEvaluation.bind(this)
        this.onCancelHandler    = this.onCancelHandler.bind(this)
        this.onSaveHandler      = this.onSaveHandler.bind(this)
    }

    /**
     * Delete row
     */
    onDeleteHandler() {
        const id = this.props.evaluation.id

        this.props.deleteAction(id)
    }

    /**
     * Change value
     * 
     * @param {Object} event 
     */
    onChangeEvaluation(event) {
        const inputs = event.target.parentNode.parentNode.getElementsByTagName('INPUT')

        this.props.changeValueAction(this.props.evaluation.id, inputs)
    }

    onEditHandler() {
        this.setState({'readOnlyRow': !this.state.readOnlyRow})

        this.props.editAction(this.props.evaluation.id)
    }

    onCancelHandler() {
        this.setState({'readOnlyRow': !this.state.readOnlyRow})

        this.props.cancelEditAction(this.props.evaluation.id)
    }

    /**
     * Save data handler
     * 
     * @param {Object} event 
     */
    onSaveHandler(event) {
        this.setState({'readOnlyRow': !this.state.readOnlyRow})

        const inputs = event.target.parentNode.parentNode.getElementsByTagName('INPUT')

        this.props.saveAction(this.props.evaluation.id, inputs)
    }

    render() {
        const { readOnlyRow }                   = this.state
        const { evaluation, inputFieldsOrder, saveAction, cancelEditAction }  = this.props

        return (
            <tr>
                {inputFieldsOrder.map((name, index) => 
                    <td key={index}>
                        <input 
                            type="text" 
                            name={name}
                            value={evaluation[name] ? evaluation[name] : ''} 
                            readOnly={readOnlyRow} 
                            onChange={this.onChangeEvaluation} />
                    </td>
                )}

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

AssessmentRow.propTypes = {
    evaluation: PropTypes.object || {},
    inputFieldsOrder: PropTypes.array || [],
    saveAction: PropTypes.func || null,
    changeValueAction: PropTypes.func || null,
    deleteAction: PropTypes.func || null,
    editAction: PropTypes.func || null,
    cancelEditAction: PropTypes.func || null,
}

export default AssessmentRow

/*
    {!readOnlyRow ? <button onClick={this.onSaveHandler}>Save</button> : null}
    {!readOnlyRow ? <button onClick={this.onCancelHandler}>Cancel</button> : null}
    {readOnlyRow ? <button onClick={this.onEditHandler}>Edit</button> : null}
    {readOnlyRow ? <button onClick={this.onDeleteHandler}>Delete</button> : null}
*/