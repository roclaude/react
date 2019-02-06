import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TableRow from './TableRow'
import Button from '../elements/Button'

import './table.scss'

class Table extends Component {

    constructor(props) {
        super(props);
        
        console.log(this.props.data)
    }

    render() {
        const { 
            data,
            columnTitle,
        } = this.props

        return (
            <table>
                {columnTitle ? (
                    <thead>
                        <tr>
                            {columnTitle.map((title, index) => 
                                <th 
                                    key={index}>
                                    {title}
                                </th>
                            )}
                        </tr>
                    </thead>
                ) : null}
                {data ? (
                    <tbody>
                        {data.map((item, index) => 
                            <TableRow 
                                key={index} 
                                data={item} />)
                        }
                    </tbody>
                    ) : null
                }
            </table>
        )
    }
}

Table.propTypes = {
    data: PropTypes.array.isRequired || [],
    columnTitle: PropTypes.array || null,
}


export default Table
