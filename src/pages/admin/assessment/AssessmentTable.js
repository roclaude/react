import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AssessmentRow from './AssessmentRow'
import AssessmentTableTitle from './AssessmentTableTitle'

import './assessment.scss'


class AssessmentTable extends Component {

    render() {
        const { 
            tableColumn, 
            sortColumn, 
            sortedColumnType,
            data,
            editAction,
            cancelEditAction,
            deleteAction,
            saveAction,
            changeValueAction,
            addEvaluatorAction,
            ...rest 
        } = this.props

        console.log('data: ' + data)

        const inputFieldsOrder = tableColumn.map(col => col.type)

        console.log('inputFieldsOrder ',  inputFieldsOrder )

        return (
            <table {...rest}>
                {tableColumn ? (
                    <thead>
                        <tr>
                            {tableColumn.map((item, index) => 
                                <AssessmentTableTitle 
                                    key={index} 
                                    type={item.type}
                                    title={item.title} 
                                    sortColumn={sortColumn}
                                    sortCol={item.sortCol}
                                    sortedColumnType={sortedColumnType}
                                />
                            )}
                        </tr>
                    </thead>
                ) : null}

                {data ? (
                    <tbody>
                    {data.map((item, index) =>
                        <AssessmentRow 
                            key={index} 
                            evaluation={item} 
                            editAction={editAction} 
                            deleteAction={deleteAction}
                            cancelEditAction={cancelEditAction}
                            changeValueAction={changeValueAction}
                            addEvaluatorAction={addEvaluatorAction}
                            saveAction={saveAction}
                            inputFieldsOrder={inputFieldsOrder} />
                    )}
                    </tbody>
                ) : null}

            </table>
        )
    }
}

AssessmentTable.propTypes = {
    data: PropTypes.array || [],
    tableColumn: PropTypes.array || [],
    sortedColumnType: PropTypes.string || null,
    editAction: PropTypes.func || null,
    cancelEditAction: PropTypes.func || null,
    deleteAction: PropTypes.func || null,
    saveAction: PropTypes.func || null,
    changeValueAction: PropTypes.func || null,
}

export default AssessmentTable



/*
                {data ? (
                    <tbody>
                    {data.map((item, index) =>
                        <AssessmentRow 
                            key={index} 
                            evaluation={item} 
                            editAction={editAction} 
                            deleteAction={deleteAction}
                            cancelEditAction={cancelEditAction}
                            changeValueAction={changeValueAction}
                            addEvaluatorAction={addEvaluatorAction}
                            saveAction={saveAction} />
                    )}
                    </tbody>
                ) : null}
*/