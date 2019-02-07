import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from '../../../components/elements/Button'

import './assessment.scss'


class AssessmentRow extends Component {

    constructor(props) {
        super(props)

        this.state = {
            readOnlyRow: true,
            id: this.props.evaluation.id,
        }

        this.onDeleteHandler        = this.onDeleteHandler.bind(this)
        this.onEditHandler          = this.onEditHandler.bind(this)
        this.onChangeEvaluation     = this.onChangeEvaluation.bind(this)
        this.onCancelHandler        = this.onCancelHandler.bind(this)
        this.onSaveHandler          = this.onSaveHandler.bind(this)
        this.onAddEvaluatorHandler  = this.onAddEvaluatorHandler.bind(this)
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

        this.getRowInputFields(event, this.props.changeValueAction)
    }

    /**
     * Save data handler
     * 
     * @param {Object} event 
     */
    onSaveHandler(event) {
        this.setState({'readOnlyRow': !this.state.readOnlyRow})

        this.getRowInputFields(event, this.props.saveAction)
    }

    /**
     * Get input fields
     */
    getRowInputFields(event, actionFunc) {
        let k = true
        let parent = event.target.parentNode
        while(k) {
            if (parent.tagName==='TR') {
                k=false 
                actionFunc(this.props.evaluation.id, parent.getElementsByTagName('INPUT'))
            }
            parent = parent.parentNode
        } 
    }

    /**
     * Edit field
     */
    onEditHandler() {
        this.setState({'readOnlyRow': !this.state.readOnlyRow})

        this.props.editAction(this.props.evaluation.id)
    }

    /**
     * Cancel editing field
     */
    onCancelHandler() {
        this.setState({'readOnlyRow': !this.state.readOnlyRow})

        this.props.cancelEditAction(this.props.evaluation.id)
    }

    /**
     * Add evaluator Handler
     */
    onAddEvaluatorHandler() {
        console.log('row (id): ', this.props.evaluation.id)
        this.props.addEvaluatorAction(this.props.evaluation.id)
    }

    render() {
        const { readOnlyRow } = this.state
        const { 
            evaluation, 
            saveAction,
            editAction, 
            cancelEditAction,
            addEvaluatorAction,
            inputFieldsOrder,
        }  = this.props

        const id = this.props.evaluation.id

        return (
            <tr>
                {inputFieldsOrder.map((name, index) =>
                    
                    name!=='action' ?
                        <td key={index}>
                            <input 
                                type="text" 
                                name={name}
                                onClick={this.orderColumn}
                                value={evaluation[name] ? evaluation[name] : ''} 
                                onChange={this.onChangeEvaluation} 
                                readOnly={readOnlyRow}/>
                        </td>
                    : 
                        <td key={index}>
                            {!readOnlyRow && saveAction ? (
                                <span>
                                    <Button text="Save" onClick={this.onSaveHandler} />
                                    <Button text="Cancel" onClick={this.onCancelHandler} />
                                </span>
                            ): null}
                        
                            {readOnlyRow && editAction ? (
                                <span>
                                    <Button text="Edit" onClick={this.onEditHandler} />
                                    <Button text="Delete" onClick={this.onDeleteHandler} />
                                </span>
                            ): null}
                        
                            {addEvaluatorAction ? (
                                <span>
                                    <Button text="Add" onClick={this.onAddEvaluatorHandler} />
                                </span>
                            ): null}
                        </td>
                )}
            </tr>
        )
    }
}

AssessmentRow.propTypes = {
    evaluation: PropTypes.object || {},
    saveAction: PropTypes.func || null,
    changeValueAction: PropTypes.func || null,
    deleteAction: PropTypes.func || null,
    editAction: PropTypes.func || null,
    cancelEditAction: PropTypes.func || null,
    addEvaluatorAction: PropTypes.func || null
}

export default AssessmentRow