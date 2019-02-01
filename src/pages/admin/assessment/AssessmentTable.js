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
            deleteAction,
            saveAction, 
            ...rest 
        } = this.props

        return (
            <table {...rest}>
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
                <tbody>
                {data.map((item, index) =>
                    <AssessmentRow 
                        key={index} 
                        evaluation={item} 
                        editAction={editAction} 
                        deleteAction={deleteAction} 
                        saveAction={saveAction} />
                )}
                </tbody>
            </table>
        )
    }
}

AssessmentTable.propTypes = {
    children: PropTypes.array || null,
    columnTitles: PropTypes.array || null,
}


export default AssessmentTable