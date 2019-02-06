import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AssessmentRow from './AssessmentRow'

import './assessment.scss'


class AssessmentTable extends Component {

    render() {
        const { 
            columnTitles, 
            sortedColumn, 
            data,
            editAction,
            cancelEditAction,
            deleteAction,
            saveAction,
            changeValueAction,
            inputFieldsOrder,
            ...rest 
        } = this.props

        return (
            <table {...rest}>
                {columnTitles ? (
                    <thead>
                        <tr>
                            {columnTitles.map((item, index) => 
                                <th 
                                    key={index} 
                                    onClick={item.orderFunc} 
                                    className={item.orderFunc ? 'sort' + (sortedColumn === item.name ? ' active' : '') : null}
                                >
                                    {item.name}
                                </th>
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
                            inputFieldsOrder={inputFieldsOrder}
                            saveAction={saveAction} />
                    )}
                    </tbody>
                ) : null}
            </table>
        )
    }
}

AssessmentTable.propTypes = {
    data: PropTypes.array || [],
    columnTitles: PropTypes.array || null,
    sortedColumn: PropTypes.string || null,
    editAction: PropTypes.func || null,
    cancelEditAction: PropTypes.func || null,
    deleteAction: PropTypes.func || null,
    saveAction: PropTypes.func || null,
    changeValueAction: PropTypes.func || null,
    inputFieldsOrder: PropTypes.array || [],
}

export default AssessmentTable