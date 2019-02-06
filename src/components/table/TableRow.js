import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './tableRow.scss'

class Table extends Component {

    render() {
        const { 
            data
        } = this.props

        return (
            <tr>
                {Object.keys(data).map((key, index) => <td key={index}>{data[key]}</td>)}
            </tr>
        )
    }
}

export default Table
