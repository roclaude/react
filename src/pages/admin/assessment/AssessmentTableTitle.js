import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AssessmentRow from './AssessmentRow'


import './assessment.scss'


class AssessmentTable extends Component {

    constructor(props) {
        super(props)

        this.onSortColumnHandler = this.onSortColumnHandler.bind(this)
        console.log('kkk');
    }

    onSortColumnHandler() {
        this.props.sortColumn(this.props.type)
    }

    render() {

        const { 
            title,
            type,
            sortedColumnType,
            sortCol,
        } = this.props

        return (
            <th 
                className={sortCol ? 
                    'sort' + (sortedColumnType===type ? ' active' : '')
                    : ''
                }
                onClick={sortCol ? this.onSortColumnHandler : null}>
                {title}
            </th>
        )
    }
}

AssessmentTable.propTypes = {
    title: PropTypes.string || 'Unknown',
    sortColumn: PropTypes.func || null,
    type: PropTypes.string || null
}

export default AssessmentTable





/*
<th 
key={index} 
onClick={item.orderFunc} 
className={item.orderFunc ? 'sort' + (sortedColumn === item.name ? ' active' : '') : null}
>
{item.name}
</th>
*/
